// "use client";
// import React, { useEffect, useLayoutEffect, useState } from "react";
// import * as am5 from "@amcharts/amcharts5";
// import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
// import axiosInstance from "@/utils/axiosInstance";

// export default function AttendanceHierarchy({ adminId }) {
//   const [chartData, setChartData] = useState([]);

//   // 🔹 Transform raw attendance into hierarchy format
//   function transformAttendanceData(rawData) {
//     const batchMap = {};

//     rawData.forEach((item) => {
//       if (!batchMap[item.batch_name]) batchMap[item.batch_name] = {};
//       if (!batchMap[item.batch_name][item.subject_name]) {
//         batchMap[item.batch_name][item.subject_name] = { Present: 0, Absent: 0 };
//       }

//       if (item.status === "present") {
//         batchMap[item.batch_name][item.subject_name].Present++;
//       } else {
//         batchMap[item.batch_name][item.subject_name].Absent++;
//       }
//     });

//     return Object.keys(batchMap).map((batch) => ({
//       name: batch,
//       children: Object.keys(batchMap[batch]).map((subject) => ({
//         name: subject,
//         children: [
//           { name: "Present", value: batchMap[batch][subject].Present },
//           { name: "Absent", value: batchMap[batch][subject].Absent },
//         ],
//       })),
//     }));
//   }

//   // 🔹 Fetch attendance data
//   useEffect(() => {
//     axiosInstance
//       .get(`/admin/${adminId}/attendance`)
//       .then((res) => {
//         const transformed = transformAttendanceData(res.data);
//         setChartData(transformed);
//       })
//       .catch((err) => console.error(err));
//   }, [adminId]);

//   // 🔹 Render amCharts Tree
//   useLayoutEffect(() => {
//     if (chartData.length === 0) return;

//     let root = am5.Root.new("chartdiv");
//     root.setThemes([am5themes_Animated.new(root)]);

//     let series = root.container.children.push(
//       am5hierarchy.Tree.new(root, {
//         singleBranchOnly: false,
//         downDepth: 1,
//         initialDepth: 1,
//         valueField: "value",
//         categoryField: "name",
//         childDataField: "children",
//         nodePadding: 15,
//         width: am5.percent(100),
//         height: am5.percent(100),
//       })
//     );

//     series.data.setAll(chartData);
//     series.set("selectedDataItem", series.dataItems[0]);
//     series.appear(1000, 100);

//     return () => {
//       root.dispose();
//     };
//   }, [chartData]);

//   return (
//     <div className="w-full max-w-6xl mx-auto mt-6 p-6 bg-white rounded-2xl shadow-md">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">
//         📊 Attendance Hierarchy
//       </h2>
//       <div
//         id="chartdiv"
//         className="w-full h-[600px] rounded-xl border border-gray-200"
//       ></div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function AttendanceHierarchy({ adminId }) {
  const chartRef = useRef(null);
  const [viewType, setViewType] = useState("tree"); // tree | treemap

  useEffect(() => {
    let root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    let series;

    if (viewType === "tree") {
      series = root.container.children.push(
        am5hierarchy.Tree.new(root, {
          singleBranchOnly: false,
          downDepth: 1,
          initialDepth: 2,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
        })
      );
    } else {
      series = root.container.children.push(
        am5hierarchy.Treemap.new(root, {
          singleBranchOnly: false,
          downDepth: 1,
          initialDepth: 2,
          valueField: "value",
          categoryField: "name",
          childDataField: "children",
        })
      );
    }

    // 🎨 Color coding
    series.nodes.template.adapters.add("fill", (fill, target) => {
      const name = target.dataItem?.dataContext?.name;
      if (name === "Present") return am5.color(0x22c55e); // green
      if (name === "Absent") return am5.color(0xef4444); // red
      return am5.color(0x3b82f6); // blue for others
    });

    series.nodes.template.setAll({
      tooltipText: "{name}: {value}",
      cursorOverStyle: "pointer",
    });

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/admin/${adminId}/attendance`);
        const chartData = transformToHierarchy(res.data);
        series.data.setAll([chartData]);
        if (series.dataItems.length > 0) {
          series.set("selectedDataItem", series.dataItems[0]); // focus root
        }
      } catch (error) {
        console.error("Error fetching attendance", error);
      }
    };

    fetchData();

    return () => {
      root.dispose();
    };
  }, [adminId, viewType]);

  return (
    <div className="space-y-4 p-4">
      {/* Toggle buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewType("tree")}
          className={`px-4 py-2 rounded ${
            viewType === "tree" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Tree View
        </button>
        <button
          onClick={() => setViewType("treemap")}
          className={`px-4 py-2 rounded ${
            viewType === "treemap" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Treemap View
        </button>
      </div>

      {/* Chart container */}
      <div ref={chartRef} className="w-full h-[600px]" />
    </div>
  );
}

// 🔹 Convert attendance data into hierarchy structure
function transformToHierarchy(data) {
  const root = { name: "Attendance", children: [] };
  const map = {};

  data.forEach(({ batch_name, subject_name, status, date }) => {
    const year = date.slice(0, 4);
    const month = date.slice(0, 7);

    if (!map[year]) map[year] = { name: year, children: {} };
    if (!map[year].children[month]) map[year].children[month] = { name: month, children: {} };
    if (!map[year].children[month].children[batch_name])
      map[year].children[month].children[batch_name] = { name: batch_name, children: {} };
    if (!map[year].children[month].children[batch_name].children[subject_name])
      map[year].children[month].children[batch_name].children[subject_name] = {
        name: subject_name,
        children: {
          Present: { name: "Present", value: 0 },
          Absent: { name: "Absent", value: 0 },
        },
      };

    map[year].children[month].children[batch_name].children[subject_name].children[
      status.charAt(0).toUpperCase() + status.slice(1)
    ].value += 1;
  });

  root.children = Object.values(map).map((y) => ({
    name: y.name,
    children: Object.values(y.children).map((m) => ({
      name: m.name,
      children: Object.values(m.children).map((b) => ({
        name: b.name,
        children: Object.values(b.children).map((s) => ({
          name: s.name,
          children: Object.values(s.children),
        })),
      })),
    })),
  }));

  return root;
}
