// // // "use client";

// // // import { router } from "@inertiajs/react";
// // // import { Eye, EyeOff } from "lucide-react";
// // // import { useEffect, useState } from "react";
// // // import toast from "react-hot-toast";
// // // import axiosInstance from "@/utils/axiosInstance";

// // // export default function AddUser({ onSubmit, permissionsData }) {
// // //     const [showPassword, setShowPassword] = useState(false);
// // //     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// // //     const [roles, setRoles] = useState([]);
// // //     const [permissionsData, setPermissionsData] = useState([]);
// // //     const [selectedPermissions, setSelectedPermissions] = useState([]);

// // //     useEffect(() => {
// // //         const fetchData = async () => {
// // //             try {
// // //                 const [rolesRes, permissionsRes] = await Promise.all([
// // //                     axiosInstance.get("/supper/roles"),
// // //                     axiosInstance.get("/supper/permission-list"),
// // //                 ]);
// // //                 setRoles(rolesRes.data);
// // //                 setPermissionsData(permissionsRes.data);
// // //             } catch (err) {
// // //                 toast.error("Failed to load roles or permissions");
// // //                 console.error(err);
// // //             }
// // //         };

// // //         fetchData();
// // //     }, []);

// // //     const [formData, setFormData] = useState({
// // //         name: "",
// // //         email: "",
// // //         password: "",
// // //         confirmPassword: "",
// // //         phone: "",
// // //         dob: "",
// // //         ip: "",
// // //         role: "",
// // //         address: "",
// // //     });

// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setFormData((prev) => ({ ...prev, [name]: value }));
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         const data = { ...formData, permissions: selectedPermissions };
// // //         onSubmit(data);

// // //         // Validate required fields
// // //         if (
// // //             !data.name ||
// // //             !data.email ||
// // //             !data.password ||
// // //             !data.confirmPassword
// // //         ) {
// // //             toast.error("Please fill all required fields!");
// // //             return;
// // //         }

// // //         if (data.password !== data.confirmPassword) {
// // //             toast.error("Passwords do not match!");
// // //             return;
// // //         }

// // //         // Send to Laravel
// // //         router.post(route("supper.adduser.store"), data, {
// // //             onSuccess: () => {
// // //                 toast.success("Sub-Admin Added!");
// // //                 setFormData({
// // //                     name: "",
// // //                     email: "",
// // //                     password: "",
// // //                     confirmPassword: "",
// // //                     phone: "",
// // //                     dob: "",
// // //                     ip: "",
// // //                     address: "",
// // //                 });
// // //             },
// // //             onError: (errors) => {
// // //                 Object.values(errors).forEach((msg) => toast.error(msg));
// // //             },
// // //         });
// // //     };

// // //     return (
// // //         <form className="p-4 space-y-4" onSubmit={handleSubmit}>
// // //             {/* Input Fields */}
// // //             {[
// // //                 {
// // //                     label: "Name",
// // //                     name: "name",
// // //                     type: "text",
// // //                     placeholder: "Enter full name",
// // //                 },
// // //                 {
// // //                     label: "Email",
// // //                     name: "email",
// // //                     type: "email",
// // //                     placeholder: "Enter email address",
// // //                 },
// // //                 {
// // //                     label: "Phone Number",
// // //                     name: "phone",
// // //                     type: "tel",
// // //                     placeholder: "Enter phone number",
// // //                 },
// // //                 { label: "Date of Birth", name: "dob", type: "date" },
// // //                 {
// // //                     label: "IP Address",
// // //                     name: "ip",
// // //                     type: "text",
// // //                     placeholder: "Enter IP address",
// // //                 },
// // //             ].map(({ label, name, type, placeholder }) => (
// // //                 <div key={name}>
// // //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                         {label}
// // //                     </label>
// // //                     <input
// // //                         name={name}
// // //                         type={type}
// // //                         placeholder={placeholder}
// // //                         value={formData[name]}
// // //                         onChange={handleChange}
// // //                         className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// // //                     />
// // //                 </div>
// // //             ))}

// // //             {/* Password */}
// // //             <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                     Password
// // //                 </label>
// // //                 <div className="relative mt-1">
// // //                     <input
// // //                         name="password"
// // //                         type={showPassword ? "text" : "password"}
// // //                         placeholder="Enter password"
// // //                         value={formData.password}
// // //                         onChange={handleChange}
// // //                         className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
// // //                     />
// // //                     <button
// // //                         type="button"
// // //                         onClick={() => setShowPassword(!showPassword)}
// // //                         className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
// // //                     >
// // //                         {showPassword ? (
// // //                             <EyeOff className="w-5 h-5" />
// // //                         ) : (
// // //                             <Eye className="w-5 h-5" />
// // //                         )}
// // //                     </button>
// // //                 </div>
// // //             </div>

// // //             {/* Confirm Password */}
// // //             <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                     Confirm Password
// // //                 </label>
// // //                 <div className="relative mt-1">
// // //                     <input
// // //                         name="confirmPassword"
// // //                         type={showConfirmPassword ? "text" : "password"}
// // //                         placeholder="Confirm password"
// // //                         value={formData.confirmPassword}
// // //                         onChange={handleChange}
// // //                         className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
// // //                     />
// // //                     <button
// // //                         type="button"
// // //                         onClick={() =>
// // //                             setShowConfirmPassword(!showConfirmPassword)
// // //                         }
// // //                         className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
// // //                     >
// // //                         {showConfirmPassword ? (
// // //                             <EyeOff className="w-5 h-5" />
// // //                         ) : (
// // //                             <Eye className="w-5 h-5" />
// // //                         )}
// // //                     </button>
// // //                 </div>
// // //             </div>
// // //             {/* role selection */}

// // //             <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                     Role
// // //                 </label>
// // //                 <select
// // //                     name="role"
// // //                     value={formData.role}
// // //                     onChange={handleChange}
// // //                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// // //                 >
// // //                     <option value="">Select role</option>
// // //                     {roles.map((role) => (
// // //                         <option key={role} value={role}>
// // //                             {role}
// // //                         </option>
// // //                     ))}
// // //                 </select>
// // //             </div>

// // //             {/* added */}
// // //             {/* {formData.role && (
// // //                 <div className="mt-4">
// // //                     <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
// // //                         Assign Permissions for{" "}
// // //                         <span className="capitalize">{formData.role}</span>:
// // //                     </h3>
// // //                     <div className="grid grid-cols-2 gap-2">
// // //                         {permissionsData
// // //                             .find((group) => group.feature === formData.role)
// // //                             ?.permissions.map((perm) => (
// // //                                 <label
// // //                                     key={perm}
// // //                                     className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200"
// // //                                 >
// // //                                     <input
// // //                                         type="checkbox"
// // //                                         value={perm}
// // //                                         checked={selectedPermissions.includes(
// // //                                             perm
// // //                                         )}
// // //                                         onChange={(e) => {
// // //                                             const checked = e.target.checked;
// // //                                             const value = e.target.value;
// // //                                             setSelectedPermissions((prev) =>
// // //                                                 checked
// // //                                                     ? [...prev, value]
// // //                                                     : prev.filter(
// // //                                                           (p) => p !== value
// // //                                                       )
// // //                                             );
// // //                                         }}
// // //                                     />
// // //                                     {perm}
// // //                                 </label>
// // //                             ))}
// // //                     </div>
// // //                 </div>
// // //             )} */}

// // //             {formData.role && (
// // //                 <div className="mt-4">
// // //                     <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
// // //                         Assign Permissions to:{" "}
// // //                         <span className="capitalize">{formData.role}</span>
// // //                     </h3>

// // //                     {permissionsData
// // //                         .filter((group) => group.feature === formData.role)
// // //                         .map((group) => (
// // //                             <div key={group.feature} className="mb-3">
// // //                                 <p className="text-sm font-medium text-gray-800 dark:text-white mb-1">
// // //                                     {group.feature}
// // //                                 </p>
// // //                                 <div className="grid grid-cols-2 gap-2">
// // //                                     {group.permissions.map((perm) => (
// // //                                         <label
// // //                                             key={perm}
// // //                                             className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
// // //                                         >
// // //                                             <input
// // //                                                 type="checkbox"
// // //                                                 value={perm}
// // //                                                 checked={selectedPermissions.includes(
// // //                                                     perm
// // //                                                 )}
// // //                                                 onChange={(e) => {
// // //                                                     const checked =
// // //                                                         e.target.checked;
// // //                                                     setSelectedPermissions(
// // //                                                         (prev) =>
// // //                                                             checked
// // //                                                                 ? [
// // //                                                                       ...prev,
// // //                                                                       perm,
// // //                                                                   ]
// // //                                                                 : prev.filter(
// // //                                                                       (p) =>
// // //                                                                           p !==
// // //                                                                           perm
// // //                                                                   )
// // //                                                     );
// // //                                                 }}
// // //                                             />
// // //                                             {perm}
// // //                                         </label>
// // //                                     ))}
// // //                                 </div>
// // //                             </div>
// // //                         ))}
// // //                 </div>
// // //             )}

// // //             {/* Address */}
// // //             <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                     Residential Address
// // //                 </label>
// // //                 <textarea
// // //                     name="address"
// // //                     value={formData.address}
// // //                     onChange={handleChange}
// // //                     placeholder="Enter residential address"
// // //                     rows="3"
// // //                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// // //                 />
// // //             </div>

// // //             <button
// // //                 type="submit"
// // //                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
// // //             >
// // //                 Submit
// // //             </button>
// // //         </form>
// // //     );
// // // }

// // // "use client";

// // // import { router } from "@inertiajs/react";
// // // import { Eye, EyeOff } from "lucide-react";
// // // import { useEffect, useState } from "react";
// // // import toast from "react-hot-toast";

// // // export default function AddUser({
// // //     onSubmit,
// // //     permissionsData,
// // //     initialData = null,
// // // }) {
// // //     const [showPassword, setShowPassword] = useState(false);
// // //     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// // //     const [formData, setFormData] = useState({
// // //         name: "",
// // //         email: "",
// // //         password: "",
// // //         confirmPassword: "",
// // //         phone: "",
// // //         dob: "",
// // //         ip: "",
// // //         address: "",
// // //         role: "",
// // //     });

// // //     const [selectedPermissions, setSelectedPermissions] = useState([]);

// // //     useEffect(() => {
// // //         if (initialData) {
// // //             setFormData({
// // //                 name: initialData.name || "",
// // //                 email: initialData.email || "",
// // //                 password: "",
// // //                 confirmPassword: "",
// // //                 phone: initialData.phone || "",
// // //                 dob: initialData.dob || "",
// // //                 ip: initialData.ip || "",
// // //                 address: initialData.address || "",
// // //                 role: initialData.role || "",
// // //             });

// // //             setSelectedPermissions(initialData.permissions || []);
// // //         }
// // //     }, [initialData]);

// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setFormData((prev) => ({ ...prev, [name]: value }));

// // //         // Reset selected permissions when role changes
// // //         if (name === "role") {
// // //             setSelectedPermissions([]);
// // //         }
// // //     };

// // //     const handlePermissionToggle = (perm) => {
// // //         setSelectedPermissions((prev) =>
// // //             prev.includes(perm)
// // //                 ? prev.filter((p) => p !== perm)
// // //                 : [...prev, perm]
// // //         );
// // //     };

// // //     // const handleSubmit = async (e) => {
// // //     //     e.preventDefault();

// // //     //     const data = {
// // //     //         ...formData,
// // //     //         permissions: selectedPermissions,
// // //     //     };

// // //     //     // Validate required fields
// // //     //     if (
// // //     //         !data.name ||
// // //     //         !data.email ||
// // //     //         !data.password ||
// // //     //         !data.confirmPassword ||
// // //     //         !data.role
// // //     //     ) {
// // //     //         toast.error("Please fill all required fields!");
// // //     //         return;
// // //     //     }

// // //     //     if (data.password !== data.confirmPassword) {
// // //     //         toast.error("Passwords do not match!");
// // //     //         return;
// // //     //     }

// // //     //     // Call the onSubmit passed from parent
// // //     //     onSubmit(data);

// // //     //     // Optionally reset form
// // //     //     setFormData({
// // //     //         name: "",
// // //     //         email: "",
// // //     //         password: "",
// // //     //         confirmPassword: "",
// // //     //         phone: "",
// // //     //         dob: "",
// // //     //         ip: "",
// // //     //         address: "",
// // //     //         role: "",
// // //     //     });
// // //     //     setSelectedPermissions([]);
// // //     // };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();

// // //         const data = {
// // //             ...formData,
// // //             permissions: selectedPermissions,
// // //         };

// // //         // Required fields (name, email, role are always required)
// // //         if (!data.name || !data.email || !data.role) {
// // //             toast.error("Please fill all required fields!");
// // //             return;
// // //         }

// // //         // Password validation only if password fields are filled
// // //         const isEditMode = !!initialData;
// // //         const isPasswordBeingUpdated = data.password || data.confirmPassword;

// // //         if (!isEditMode && (!data.password || !data.confirmPassword)) {
// // //             toast.error("Password is required!");
// // //             return;
// // //         }

// // //         if (isPasswordBeingUpdated && data.password !== data.confirmPassword) {
// // //             toast.error("Passwords do not match!");
// // //             return;
// // //         }

// // //         if (!isPasswordBeingUpdated) {
// // //             delete data.password;
// // //             delete data.confirmPassword;
// // //         }

// // //         onSubmit(data);

// // //         if (!isEditMode) {
// // //             setFormData({
// // //                 name: "",
// // //                 email: "",
// // //                 password: "",
// // //                 confirmPassword: "",
// // //                 phone: "",
// // //                 dob: "",
// // //                 ip: "",
// // //                 address: "",
// // //                 role: "",
// // //             });
// // //             setSelectedPermissions([]);
// // //         }
// // //     };

// // //     return (
// // //         <form className="p-4 space-y-4" onSubmit={handleSubmit}>
// // //             {/* Input Fields */}
// // //             {[
// // //                 {
// // //                     label: "Name",
// // //                     name: "name",
// // //                     type: "text",
// // //                     placeholder: "Enter full name",
// // //                 },
// // //                 {
// // //                     label: "Email",
// // //                     name: "email",
// // //                     type: "email",
// // //                     placeholder: "Enter email address",
// // //                 },
// // //                 {
// // //                     label: "Phone Number",
// // //                     name: "phone",
// // //                     type: "tel",
// // //                     placeholder: "Enter phone number",
// // //                 },
// // //                 { label: "Date of Birth", name: "dob", type: "date" },
// // //                 {
// // //                     label: "IP Address",
// // //                     name: "ip",
// // //                     type: "text",
// // //                     placeholder: "Enter IP address",
// // //                 },
// // //             ].map(({ label, name, type, placeholder }) => (
// // //                 <div key={name}>
// // //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                         {label}
// // //                     </label>
// // //                     <input
// // //                         name={name}
// // //                         type={type}
// // //                         placeholder={placeholder}
// // //                         value={formData[name]}
// // //                         onChange={handleChange}
// // //                         className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// // //                     />
// // //                 </div>
// // //             ))}

// // //             {/* Password */}
// // //             <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                     Password
// // //                 </label>
// // //                 <div className="relative mt-1">
// // //                     <input
// // //                         name="password"
// // //                         type={showPassword ? "text" : "password"}
// // //                         placeholder="Enter password"
// // //                         value={formData.password}
// // //                         onChange={handleChange}
// // //                         className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
// // //                     />
// // //                     <button
// // //                         type="button"
// // //                         onClick={() => setShowPassword(!showPassword)}
// // //                         className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
// // //                     >
// // //                         {showPassword ? (
// // //                             <EyeOff className="w-5 h-5" />
// // //                         ) : (
// // //                             <Eye className="w-5 h-5" />
// // //                         )}
// // //                     </button>
// // //                 </div>
// // //             </div>

// // //             {/* Confirm Password */}
// // //             <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                     Confirm Password
// // //                 </label>
// // //                 <div className="relative mt-1">
// // //                     <input
// // //                         name="confirmPassword"
// // //                         type={showConfirmPassword ? "text" : "password"}
// // //                         placeholder="Confirm password"
// // //                         value={formData.confirmPassword}
// // //                         onChange={handleChange}
// // //                         className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
// // //                     />
// // //                     <button
// // //                         type="button"
// // //                         onClick={() =>
// // //                             setShowConfirmPassword(!showConfirmPassword)
// // //                         }
// // //                         className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
// // //                     >
// // //                         {showConfirmPassword ? (
// // //                             <EyeOff className="w-5 h-5" />
// // //                         ) : (
// // //                             <Eye className="w-5 h-5" />
// // //                         )}
// // //                     </button>
// // //                 </div>
// // //             </div>

// // //             {/* Role */}
// // //             <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                     Role
// // //                 </label>
// // //                 <select
// // //                     name="role"
// // //                     value={formData.role}
// // //                     onChange={handleChange}
// // //                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// // //                 >
// // //                     <option value="">Select role</option>
// // //                     {/* Dynamic options based on available features */}
// // //                     {permissionsData.map((group) => (
// // //                         <option key={group.feature} value={group.feature}>
// // //                             {group.feature}
// // //                         </option>
// // //                     ))}
// // //                 </select>
// // //             </div>

// // //             {/* Permissions Checkboxes */}
// // //             {formData.role && (
// // //                 <div className="mt-4">
// // //                     <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
// // //                         Assign Permissions for{" "}
// // //                         <span className="capitalize">{formData.role}</span>:
// // //                     </h3>
// // //                     {permissionsData
// // //                         .filter((group) => group.feature === formData.role)
// // //                         .map((group) => (
// // //                             <div key={group.feature} className="mb-3">
// // //                                 <div className="grid grid-cols-2 gap-2">
// // //                                     {group.permissions.map((perm) => (
// // //                                         <label
// // //                                             key={perm}
// // //                                             className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
// // //                                         >
// // //                                             <input
// // //                                                 type="checkbox"
// // //                                                 value={perm}
// // //                                                 checked={selectedPermissions.includes(
// // //                                                     perm
// // //                                                 )}
// // //                                                 onChange={() =>
// // //                                                     handlePermissionToggle(perm)
// // //                                                 }
// // //                                             />
// // //                                             {perm}
// // //                                         </label>
// // //                                     ))}
// // //                                 </div>
// // //                             </div>
// // //                         ))}
// // //                 </div>
// // //             )}

// // //             {/* Address */}
// // //             <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                     Residential Address
// // //                 </label>
// // //                 <textarea
// // //                     name="address"
// // //                     value={formData.address}
// // //                     onChange={handleChange}
// // //                     placeholder="Enter residential address"
// // //                     rows="3"
// // //                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// // //                 />
// // //             </div>

// // //             <button
// // //                 type="submit"
// // //                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
// // //             >
// // //                 Submit
// // //             </button>
// // //         </form>
// // //     );
// // // }
// // // import { Eye, EyeOff } from "lucide-react";
// // // import { useEffect, useState } from "react";
// // // import toast from "react-hot-toast";

// // // export default function AddUser({ onSubmit, permissionsData, initialData = null }) {
// // //     const [showPassword, setShowPassword] = useState(false);
// // //     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// // //     const [formData, setFormData] = useState({
// // //         name: "",
// // //         email: "",
// // //         password: "",
// // //         confirmPassword: "",
// // //         phone: "",
// // //         dob: "",
// // //         ip: "",
// // //         address: "",
// // //         role: "",
// // //     });

// // //     const [selectedPermissions, setSelectedPermissions] = useState([]);

// // //     const isEditMode = !!initialData;

// // //     useEffect(() => {
// // //         if (initialData) {
// // //             setFormData({
// // //                 name: initialData.name || "",
// // //                 email: initialData.email || "",
// // //                 password: "",
// // //                 confirmPassword: "",
// // //                 phone: initialData.phone || "",
// // //                 dob: initialData.dob || "",
// // //                 ip: initialData.ip || "",
// // //                 address: initialData.address || "",
// // //                 role: initialData.role || "",
// // //             });
// // //             // Parse permissions string into array for checkboxes
// // //             setSelectedPermissions(
// // //                 initialData.permissions
// // //                     ? initialData.permissions.split('.').filter(Boolean)
// // //                     : []
// // //             );
// // //         }
// // //     }, [initialData]);

// // //     const handleChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setFormData((prev) => ({ ...prev, [name]: value }));

// // //         if (name === "role") {
// // //             setSelectedPermissions([]);
// // //         }
// // //     };

// // //     const handlePermissionToggle = (perm) => {
// // //         setSelectedPermissions((prev) =>
// // //             prev.includes(perm)
// // //                 ? prev.filter((p) => p !== perm)
// // //                 : [...prev, perm]
// // //         );
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();

// // //         const data = {
// // //             ...formData,
// // //             permissions: selectedPermissions.length > 0 ? '.' + selectedPermissions.join('.') : null,
// // //         };

// // //         if (!data.name || !data.email || !data.role) {
// // //             toast.error("Please fill all required fields!");
// // //             return;
// // //         }

// // //         const isPasswordBeingUpdated = data.password || data.confirmPassword;

// // //         if (!isEditMode && (!data.password || !data.confirmPassword)) {
// // //             toast.error("Password is required!");
// // //             return;
// // //         }

// // //         if (isPasswordBeingUpdated && data.password !== data.confirmPassword) {
// // //             toast.error("Passwords do not match!");
// // //             return;
// // //         }

// // //         if (!isPasswordBeingUpdated) {
// // //             delete data.password;
// // //             delete data.confirmPassword;
// // //         }

// // //         console.log("Submitting data:", data);
// // //         onSubmit(data);

// // //         if (!isEditMode) {
// // //             setFormData({
// // //                 name: "",
// // //                 email: "",
// // //                 password: "",
// // //                 confirmPassword: "",
// // //                 phone: "",
// // //                 dob: "",
// // //                 ip: "",
// // //                 address: "",
// // //                 role: "",
// // //             });
// // //             setSelectedPermissions([]);
// // //         }
// // //     };

// // //     return (
// // //         <form className="p-4 space-y-4" onSubmit={handleSubmit}>
// // //             {[
// // //                 {
// // //                     label: "Name",
// // //                     name: "name",
// // //                     type: "text",
// // //                     placeholder: "Enter full name",
// // //                 },
// // //                 {
// // //                     label: "Email",
// // //                     name: "email",
// // //                     type: "email",
// // //                     placeholder: "Enter email address",
// // //                 },
// // //                 {
// // //                     label: "Phone Number",
// // //                     name: "phone",
// // //                     type: "tel",
// // //                     placeholder: "Enter phone number",
// // //                 },
// // //                 { label: "Date of Birth", name: "dob", type: "date" },
// // //                 {
// // //                     label: "IP Address",
// // //                     name: "ip",
// // //                     type: "text",
// // //                     placeholder: "Enter IP address",
// // //                 },
// // //             ].map(({ label, name, type, placeholder }) => (
// // //                 <div key={name}>
// // //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                         {label}
// // //                     </label>
// // //                     <input
// // //                         name={name}
// // //                         type={type}
// // //                         placeholder={placeholder}
// // //                         value={formData[name]}
// // //                         onChange={handleChange}
// // //                         className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// // //                     />
// // //                 </div>
// // //             ))}

// // //             {isEditMode && (
// // //                 <>
// // //                     <div>
// // //                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                             Password (optional)
// // //                         </label>
// // //                         <div className="relative mt-1">
// // //                             <input
// // //                                 name="password"
// // //                                 type={showPassword ? "text" : "password"}
// // //                                 placeholder="Enter new password"
// // //                                 value={formData.password}
// // //                                 onChange={handleChange}
// // //                                 className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
// // //                             />
// // //                             <button
// // //                                 type="button"
// // //                                 onClick={() => setShowPassword(!showPassword)}
// // //                                 className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
// // //                             >
// // //                                 {showPassword ? (
// // //                                     <EyeOff className="w-5 h-5" />
// // //                                 ) : (
// // //                                     <Eye className="w-5 h-5" />
// // //                                 )}
// // //                             </button>
// // //                         </div>
// // //                     </div>

// // //                     <div>
// // //                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                             Confirm Password (optional)
// // //                         </label>
// // //                         <div className="relative mt-1">
// // //                             <input
// // //                                 name="confirmPassword"
// // //                                 type={showConfirmPassword ? "text" : "password"}
// // //                                 placeholder="Confirm new password"
// // //                                 value={formData.confirmPassword}
// // //                                 onChange={handleChange}
// // //                                 className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
// // //                             />
// // //                             <button
// // //                                 type="button"
// // //                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // //                                 className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
// // //                             >
// // //                                 {showConfirmPassword ? (
// // //                                     <EyeOff className="w-5 h-5" />
// // //                                 ) : (
// // //                                     <Eye className="w-5 h-5" />
// // //                                 )}
// // //                             </button>
// // //                         </div>
// // //                     </div>
// // //                 </>
// // //             )}

// // //             {!isEditMode && (
// // //                 <>
// // //                     <div>
// // //                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                             Password
// // //                         </label>
// // //                         <div className="relative mt-1">
// // //                             <input
// // //                                 name="password"
// // //                                 type={showPassword ? "text" : "password"}
// // //                                 placeholder="Enter password"
// // //                                 value={formData.password}
// // //                                 onChange={handleChange}
// // //                                 className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
// // //                             />
// // //                             <button
// // //                                 type="button"
// // //                                 onClick={() => setShowPassword(!showPassword)}
// // //                                 className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
// // //                             >
// // //                                 {showPassword ? (
// // //                                     <EyeOff className="w-5 h-5" />
// // //                                 ) : (
// // //                                     <Eye className="w-5 h-5" />
// // //                                 )}
// // //                             </button>
// // //                         </div>
// // //                     </div>

// // //                     <div>
// // //                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                             Confirm Password
// // //                         </label>
// // //                         <div className="relative mt-1">
// // //                             <input
// // //                                 name="confirmPassword"
// // //                                 type={showConfirmPassword ? "text" : "password"}
// // //                                 placeholder="Confirm password"
// // //                                 value={formData.confirmPassword}
// // //                                 onChange={handleChange}
// // //                                 className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
// // //                             />
// // //                             <button
// // //                                 type="button"
// // //                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // //                                 className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
// // //                             >
// // //                                 {showConfirmPassword ? (
// // //                                     <EyeOff className="w-5 h-5" />
// // //                                 ) : (
// // //                                     <Eye className="w-5 h-5" />
// // //                                 )}
// // //                             </button>
// // //                         </div>
// // //                     </div>
// // //                 </>
// // //             )}

// // //             <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                     Role
// // //                 </label>
// // //                 <select
// // //                     name="role"
// // //                     value={formData.role}
// // //                     onChange={handleChange}
// // //                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// // //                 >
// // //                     <option value="">Select role</option>
// // //                     {permissionsData.map((group) => (
// // //                         <option key={group.feature} value={group.feature}>
// // //                             {group.feature}
// // //                         </option>
// // //                     ))}
// // //                 </select>
// // //             </div>

// // //             {formData.role && (
// // //                 <div className="mt-4">
// // //                     <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
// // //                         Assign Permissions for <span className="capitalize">{formData.role}</span>:
// // //                     </h3>
// // //                     {permissionsData
// // //                         .filter((group) => group.feature === formData.role)
// // //                         .map((group) => (
// // //                             <div key={group.feature} className="mb-3">
// // //                                 <div className="grid grid-cols-2 gap-2">
// // //                                     {group.permissions.map((perm) => (
// // //                                         <label
// // //                                             key={perm}
// // //                                             className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
// // //                                         >
// // //                                             <input
// // //                                                 type="checkbox"
// // //                                                 value={perm}
// // //                                                 checked={selectedPermissions.includes(perm)}
// // //                                                 onChange={() => handlePermissionToggle(perm)}
// // //                                             />
// // //                                             {perm}
// // //                                         </label>
// // //                                     ))}
// // //                                 </div>
// // //                             </div>
// // //                         ))}
// // //                 </div>
// // //             )}

// // //             <div>
// // //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// // //                     Residential Address
// // //                 </label>
// // //                 <textarea
// // //                     name="address"
// // //                     value={formData.address}
// // //                     onChange={handleChange}
// // //                     placeholder="Enter residential address"
// // //                     rows="3"
// // //                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// // //                 />
// // //             </div>

// // //             <button
// // //                 type="submit"
// // //                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
// // //             >
// // //                 Submit
// // //             </button>
// // //         </form>
// // //     );
// // // }

// // import { Eye, EyeOff } from "lucide-react";
// // import { useEffect, useState } from "react";
// // import toast from "react-hot-toast";

// // export default function AddUser({ onSubmit, permissionsData, initialData = null }) {
// //     const [showPassword, setShowPassword] = useState(false);
// //     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// //     const [formData, setFormData] = useState({
// //         name: "",
// //         email: "",
// //         password: "",
// //         confirmPassword: "",
// //         phone: "",
// //         dob: "",
// //         ip: "",
// //         address: "",
// //         role: "",
// //     });

// //     const [selectedPermissions, setSelectedPermissions] = useState([]);

// //     useEffect(() => {
// //         if (initialData) {
// //             setFormData({
// //                 name: initialData.name || "",
// //                 email: initialData.email || "",
// //                 password: "",
// //                 confirmPassword: "",
// //                 phone: initialData.phone || "",
// //                 dob: initialData.dob || "",
// //                 ip: initialData.ip || "",
// //                 address: initialData.address || "",
// //                 role: initialData.role || "",
// //             });
// //             setSelectedPermissions(initialData.permissions || []);
// //         }
// //     }, [initialData]);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData((prev) => ({ ...prev, [name]: value }));

// //         if (name === "role") {
// //             setSelectedPermissions([]);
// //         }
// //     };

// //     const handlePermissionToggle = (perm) => {
// //         const formattedPerm = `${formData.role}.${perm}`;
// //         setSelectedPermissions((prev) =>
// //             prev.includes(formattedPerm)
// //                 ? prev.filter((p) => p !== formattedPerm)
// //                 : [...prev, formattedPerm]
// //         );
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         const data = {
// //             ...formData,
// //             permissions: selectedPermissions,
// //         };

// //         if (!data.name || !data.email || !data.role) {
// //             toast.error("Please fill all required fields!");
// //             return;
// //         }

// //         const isEditMode = !!initialData;
// //         const isPasswordBeingUpdated = data.password || data.confirmPassword;

// //         if (!isEditMode && (!data.password || !data.confirmPassword)) {
// //             toast.error("Password is required!");
// //             return;
// //         }

// //         if (isPasswordBeingUpdated && data.password !== data.confirmPassword) {
// //             toast.error("Passwords do not match!");
// //             return;
// //         }

// //         if (!isPasswordBeingUpdated) {
// //             delete data.password;
// //             delete data.confirmPassword;
// //         }

// //         console.log("Submitting data:", data); // Debug
// //         onSubmit(data);

// //         if (!isEditMode) {
// //             setFormData({
// //                 name: "",
// //                 email: "",
// //                 password: "",
// //                 confirmPassword: "",
// //                 phone: "",
// //                 dob: "",
// //                 ip: "",
// //                 address: "",
// //                 role: "",
// //             });
// //             setSelectedPermissions([]);
// //         }
// //     };

// //     return (
// //         <form className="p-4 space-y-4" onSubmit={handleSubmit}>
// //             {[
// //                 {
// //                     label: "Name",
// //                     name: "name",
// //                     type: "text",
// //                     placeholder: "Enter full name",
// //                 },
// //                 {
// //                     label: "Email",
// //                     name: "email",
// //                     type: "email",
// //                     placeholder: "Enter email address",
// //                 },
// //                 {
// //                     label: "Phone Number",
// //                     name: "phone",
// //                     type: "tel",
// //                     placeholder: "Enter phone number",
// //                 },
// //                 { label: "Date of Birth", name: "dob", type: "date" },
// //                 {
// //                     label: "IP Address",
// //                     name: "ip",
// //                     type: "text",
// //                     placeholder: "Enter IP address",
// //                 },
// //             ].map(({ label, name, type, placeholder }) => (
// //                 <div key={name}>
// //                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                         {label}
// //                     </label>
// //                     <input
// //                         name={name}
// //                         type={type}
// //                         placeholder={placeholder}
// //                         value={formData[name]}
// //                         onChange={handleChange}
// //                         className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// //                     />
// //                 </div>
// //             ))}

// //             <div>
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     Password
// //                 </label>
// //                 <div className="relative mt-1">
// //                     <input
// //                         name="password"
// //                         type={showPassword ? "text" : "password"}
// //                         placeholder="Enter password"
// //                         value={formData.password}
// //                         onChange={handleChange}
// //                         className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
// //                     />
// //                     <button
// //                         type="button"
// //                         onClick={() => setShowPassword(!showPassword)}
// //                         className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
// //                     >
// //                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                     </button>
// //                 </div>
// //             </div>

// //             <div>
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     Confirm Password
// //                 </label>
// //                 <div className="relative mt-1">
// //                     <input
// //                         name="confirmPassword"
// //                         type={showConfirmPassword ? "text" : "password"}
// //                         placeholder="Confirm password"
// //                         value={formData.confirmPassword}
// //                         onChange={handleChange}
// //                         className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
// //                     />
// //                     <button
// //                         type="button"
// //                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                         className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
// //                     >
// //                         {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                     </button>
// //                 </div>
// //             </div>

// //             <div>
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     Role
// //                 </label>
// //                 <select
// //                     name="role"
// //                     value={formData.role}
// //                     onChange={handleChange}
// //                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// //                 >
// //                     <option value="">Select role</option>
// //                     {permissionsData.map((group) => (
// //                         <option key={group.feature} value={group.feature}>
// //                             {group.feature}
// //                         </option>
// //                     ))}
// //                 </select>
// //             </div>

// //             {formData.role && (
// //                 <div className="mt-4">
// //                     <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
// //                         Assign Permissions for <span className="capitalize">{formData.role}</span>:
// //                     </h3>
// //                     {permissionsData
// //                         .filter((group) => group.feature === formData.role)
// //                         .map((group) => (
// //                             <div key={group.feature} className="mb-3">
// //                                 <div className="grid grid-cols-2 gap-2">
// //                                     {group.permissions.map((perm) => {
// //                                         const formattedPerm = `${formData.role}.${perm}`;
// //                                         return (
// //                                             <label
// //                                                 key={perm}
// //                                                 className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
// //                                             >
// //                                                 <input
// //                                                     type="checkbox"
// //                                                     value={perm}
// //                                                     checked={selectedPermissions.includes(formattedPerm)}
// //                                                     onChange={() => handlePermissionToggle(perm)}
// //                                                 />
// //                                                 {perm}
// //                                             </label>
// //                                         );
// //                                     })}
// //                                 </div>
// //                             </div>
// //                         ))}
// //                 </div>
// //             )}

// //             <div>
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //                     Residential Address
// //                 </label>
// //                 <textarea
// //                     name="address"
// //                     value={formData.address}
// //                     onChange={handleChange}
// //                     placeholder="Enter residential address"
// //                     rows="3"
// //                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
// //                 />
// //             </div>

// //             <button
// //                 type="submit"
// //                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
// //             >
// //                 Submit
// //             </button>
// //         </form>
// //     );
// // }


// import { Eye, EyeOff } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';

// export default function AddUser({ onSubmit, permissionsData, initialData = null }) {
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         phone: '',
//         dob: '',
//         ip: '',
//         address: '',
//         role: '',
//     });
//     const [selectedPermissions, setSelectedPermissions] = useState([]);
//     const isEditMode = !!initialData;

//     useEffect(() => {
//         if (initialData) {
//             setFormData({
//                 name: initialData.name || '',
//                 email: initialData.email || '',
//                 password: '',
//                 confirmPassword: '',
//                 phone: initialData.phone || '',
//                 dob: initialData.dob || '',
//                 ip: initialData.ip || '',
//                 address: initialData.address || '',
//                 role: initialData.role || '',
//             });
//             // Handle permissions as string or array
//             setSelectedPermissions(
//                 typeof initialData.permissions === 'string' && initialData.permissions
//                     ? initialData.permissions.split('.').filter(Boolean)
//                     : Array.isArray(initialData.permissions)
//                     ? initialData.permissions
//                     : []
//             );
//         }
//     }, [initialData]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         if (name === 'role') {
//             setSelectedPermissions([]);
//         }
//     };

//     const handlePermissionToggle = (perm) => {
//         setSelectedPermissions((prev) =>
//             prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
//         );
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = {
//             ...formData,
//             permissions: selectedPermissions.length > 0 ? '.' + selectedPermissions.join('.') : null,
//         };

//         if (!data.name || !data.email || !data.role) {
//             toast.error('Please fill all required fields!');
//             return;
//         }

//         const isPasswordBeingUpdated = data.password || data.confirmPassword;
//         if (!isEditMode && (!data.password || !data.confirmPassword)) {
//             toast.error('Password is required!');
//             return;
//         }

//         if (isPasswordBeingUpdated && data.password !== data.confirmPassword) {
//             toast.error('Passwords do not match!');
//             return;
//         }

//         if (!isPasswordBeingUpdated) {
//             delete data.password;
//             delete data.confirmPassword;
//         }

//         console.log('Submitting data:', data); // Debug
//         try {
//             await onSubmit(data);
//         } catch (err) {
//             console.error('Submission error:', err);
//         }

//         if (!isEditMode) {
//             setFormData({
//                 name: '',
//                 email: '',
//                 password: '',
//                 confirmPassword: '',
//                 phone: '',
//                 dob: '',
//                 ip: '',
//                 address: '',
//                 role: '',
//             });
//             setSelectedPermissions([]);
//         }
//     };

//     return (
//         <form className="p-4 space-y-4" onSubmit={handleSubmit}>
//             {[
//                 { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter full name' },
//                 { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email address' },
//                 { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: 'Enter phone number' },
//                 { label: 'Date of Birth', name: 'dob', type: 'date' },
//                 { label: 'IP Address', name: 'ip', type: 'text', placeholder: 'Enter IP address' },
//             ].map(({ label, name, type, placeholder }) => (
//                 <div key={name}>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
//                     <input
//                         name={name}
//                         type={type}
//                         placeholder={placeholder}
//                         value={formData[name]}
//                         onChange={handleChange}
//                         className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//                     />
//                 </div>
//             ))}

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     {isEditMode ? 'Password (optional)' : 'Password'}
//                 </label>
//                 <div className="relative mt-1">
//                     <input
//                         name="password"
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder={isEditMode ? 'Enter new password' : 'Enter password'}
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
//                     >
//                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                 </div>
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     {isEditMode ? 'Confirm Password (optional)' : 'Confirm Password'}
//                 </label>
//                 <div className="relative mt-1">
//                     <input
//                         name="confirmPassword"
//                         type={showConfirmPassword ? 'text' : 'password'}
//                         placeholder={isEditMode ? 'Confirm new password' : 'Confirm password'}
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
//                     >
//                         {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                 </div>
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
//                 <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//                 >
//                     <option value="">Select role</option>
//                     {permissionsData.map((group) => (
//                         <option key={group.feature} value={group.feature}>
//                             {group.feature}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {formData.role && (
//                 <div className="mt-4">
//                     <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                         Assign Permissions for <span className="capitalize">{formData.role}</span>:
//                     </h3>
//                     {permissionsData
//                         .filter((group) => group.feature === formData.role)
//                         .map((group) => (
//                             <div key={group.feature} className="mb-3">
//                                 <div className="grid grid-cols-2 gap-2">
//                                     {group.permissions.map((perm) => (
//                                         <label
//                                             key={perm}
//                                             className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
//                                         >
//                                             <input
//                                                 type="checkbox"
//                                                 value={perm}
//                                                 checked={selectedPermissions.includes(perm)}
//                                                 onChange={() => handlePermissionToggle(perm)}
//                                             />
//                                             {perm}
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                 </div>
//             )}

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Residential Address
//                 </label>
//                 <textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     placeholder="Enter residential address"
//                     rows="3"
//                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//                 />
//             </div>

//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
//             >
//                 Submit
//             </button>
//         </form>
//     );
// }

// import { Eye, EyeOff } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';

// export default function AddUser({ onSubmit, permissionsData, initialData = null }) {
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         phone: '',
//         dob: '',
//         ip: '',
//           status: '', // Add this line
//         address: '',
//         role: '',
//     });
//     const [selectedPermissions, setSelectedPermissions] = useState([]);
//     const isEditMode = !!initialData;

//     useEffect(() => {
//         if (initialData) {
//             setFormData({
//                 name: initialData.name || '',
//                 email: initialData.email || '',
//                 password: '',
//                 confirmPassword: '',
//                 phone: initialData.phone || '',
//                 dob: initialData.dob || '',
//                 ip: initialData.ip || '',
//                 address: initialData.address || '',
//                 role: initialData.role || '',
//             });
//             setSelectedPermissions(
//                 typeof initialData.permissions === 'string' && initialData.permissions
//                     ? initialData.permissions.split('.').filter(Boolean)
//                     : Array.isArray(initialData.permissions)
//                     ? initialData.permissions
//                     : []
//             );
//         }
//     }, [initialData]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         if (name === 'role') {
//             setSelectedPermissions([]);
//         }
//     };

//     const handlePermissionToggle = (perm) => {
//         // Validate permission format (alphanumeric only)
//         if (!/^[a-zA-Z]+$/.test(perm)) {
//             toast.error(`Invalid permission: ${perm}. Only alphanumeric characters are allowed.`);
//             return;
//         }
//         setSelectedPermissions((prev) =>
//             prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
//         );
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = {
//             ...formData,
//             permissions: selectedPermissions.length > 0 ? '.' + selectedPermissions.join('.') : null,
//         };

//         // Client-side validation
//         if (!data.name || !data.email || !data.role) {
//             toast.error('Please fill all required fields!');
//             return;
//         }

//         const isPasswordBeingUpdated = data.password || data.confirmPassword;
//         if (!isEditMode && (!data.password || !data.confirmPassword)) {
//             toast.error('Password is required!');
//             return;
//         }

//         if (isPasswordBeingUpdated && data.password !== data.confirmPassword) {
//             toast.error('Passwords do not match!');
//             return;
//         }

//         if (data.permissions && !/^(\.[a-zA-Z]+)*$/.test(data.permissions)) {
//             toast.error('Permissions format is invalid. Use only alphanumeric characters.');
//             return;
//         }

//         if (!isPasswordBeingUpdated) {
//             delete data.password;
//             delete data.confirmPassword;
//         }

//         console.log('Submitting data:', data); // Debug
//         try {
//             await onSubmit(data);
//         } catch (err) {
//             console.error('Submission error:', err);
//             toast.error('Failed to submit form. Check console for details.');
//         }
//     };

//     return (
//         <form className="p-4 space-y-4" onSubmit={handleSubmit}>
//             {[
//                 { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter full name' },
//                 { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email address' },
//                 { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: 'Enter phone number' },
//                 { label: 'Date of Birth', name: 'dob', type: 'date' },
//                 { label: 'IP Address', name: 'ip', type: 'text', placeholder: 'Enter IP address' },
//             ].map(({ label, name, type, placeholder }) => (
//                 <div key={name}>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
//                     <input
//                         name={name}
//                         type={type}
//                         placeholder={placeholder}
//                         value={formData[name]}
//                         onChange={handleChange}
//                         className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//                     />
//                 </div>
//             ))}

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     {isEditMode ? 'Password (optional)' : 'Password'}
//                 </label>
//                 <div className="relative mt-1">
//                     <input
//                         name="password"
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder={isEditMode ? 'Enter new password' : 'Enter password'}
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
//                     >
//                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                 </div>
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     {isEditMode ? 'Confirm Password (optional)' : 'Confirm Password'}
//                 </label>
//                 <div className="relative mt-1">
//                     <input
//                         name="confirmPassword"
//                         type={showConfirmPassword ? 'text' : 'password'}
//                         placeholder={isEditMode ? 'Confirm new password' : 'Confirm password'}
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
//                     >
//                         {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                 </div>
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
//                 <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//                 >
//                     <option value="">Select role</option>
//                     {permissionsData.map((group) => (
//                         <option key={group.feature} value={group.feature}>
//                             {group.feature}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {formData.role && (
//                 <div className="mt-4">
//                     <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                         Assign Permissions for <span className="capitalize">{formData.role}</span>:
//                     </h3>
//                     {permissionsData
//                         .filter((group) => group.feature === formData.role)
//                         .map((group) => (
//                             <div key={group.feature} className="mb-3">
//                                 <div className="grid grid-cols-2 gap-2">
//                                     {group.permissions.map((perm) => (
//                                         <label
//                                             key={perm}
//                                             className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
//                                         >
//                                             <input
//                                                 type="checkbox"
//                                                 value={perm}
//                                                 checked={selectedPermissions.includes(perm)}
//                                                 onChange={() => handlePermissionToggle(perm)}
//                                             />
//                                             {perm}
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                 </div>
//             )}

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Residential Address
//                 </label>
//                 <textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     placeholder="Enter residential address"
//                     rows="3"
//                     className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//                 />
//             </div>

//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
//             >
//                 Submit
//             </button>
//         </form>
//     );
// }

import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AddUser({ onSubmit, permissionsData, initialData = null }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dob: '',
        ip: '',
        status: 'active',
        address: '',
        role: '',
    });

    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const isEditMode = !!initialData;

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                password: '',
                confirmPassword: '',
                phone: initialData.phone || '',
                dob: initialData.dob || '',
                ip: initialData.ip || '',
                status: initialData.status || 'active',
                address: initialData.address || '',
                role: initialData.role || '',
            });

            setSelectedPermissions(
                typeof initialData.permissions === 'string' && initialData.permissions
                    ? initialData.permissions.split('.').filter(Boolean)
                    : Array.isArray(initialData.permissions)
                        ? initialData.permissions
                        : []
            );
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === 'role') {
            setSelectedPermissions([]);
        }
    };

    const handlePermissionToggle = (perm) => {
        if (!/^[a-zA-Z]+$/.test(perm)) {
            toast.error(`Invalid permission: ${perm}. Only alphanumeric characters are allowed.`);
            return;
        }
        setSelectedPermissions((prev) =>
            prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            ...formData,
            permissions: selectedPermissions.length > 0 ? '.' + selectedPermissions.join('.') : null,
        };

        if (!data.name || !data.email || !data.role || !data.status) {
            toast.error('Please fill all required fields!');
            return;
        }

        const isPasswordBeingUpdated = data.password || data.confirmPassword;

        if (!isEditMode && (!data.password || !data.confirmPassword)) {
            toast.error('Password is required!');
            return;
        }

        if (isPasswordBeingUpdated && data.password !== data.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        if (data.permissions && !/^(\.[a-zA-Z]+)*$/.test(data.permissions)) {
            toast.error('Permissions format is invalid. Use only alphanumeric characters.');
            return;
        }

        if (!isPasswordBeingUpdated) {
            delete data.password;
            delete data.confirmPassword;
        }

        try {
            await onSubmit(data);
        } catch (err) {
            console.error('Submission error:', err);
            toast.error('Failed to submit form. Check console for details.');
        }
    };

    return (
        <form className="p-4 space-y-4" onSubmit={handleSubmit}>
            {[
                { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter full name' },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email address' },
                { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: 'Enter phone number' },
                { label: 'Date of Birth', name: 'dob', type: 'date' },
                { label: 'IP Address', name: 'ip', type: 'text', placeholder: 'Enter IP address' },
            ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                    <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                </div>
            ))}

            {/* Status Dropdown */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isEditMode ? 'Password (optional)' : 'Password'}
                </label>
                <div className="relative mt-1">
                    <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={isEditMode ? 'Enter new password' : 'Enter password'}
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isEditMode ? 'Confirm Password (optional)' : 'Confirm Password'}
                </label>
                <div className="relative mt-1">
                    <input
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={isEditMode ? 'Confirm new password' : 'Confirm password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                    >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Role Dropdown */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                    <option value="">Select role</option>
                    {permissionsData.map((group) => (
                        <option key={group.feature} value={group.feature}>
                            {group.feature}
                        </option>
                    ))}
                </select>
            </div>

            {/* Permissions */}
            {formData.role && (
                <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Assign Permissions for <span className="capitalize">{formData.role}</span>:
                    </h3>
                    {permissionsData
                        .filter((group) => group.feature === formData.role)
                        .map((group) => (
                            <div key={group.feature} className="mb-3">
                                <div className="grid grid-cols-2 gap-2">
                                    {group.permissions.map((perm) => (
                                        <label
                                            key={perm}
                                            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
                                        >
                                            <input
                                                type="checkbox"
                                                value={perm}
                                                checked={selectedPermissions.includes(perm)}
                                                onChange={() => handlePermissionToggle(perm)}
                                            />
                                            {perm}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            )}

            {/* Address */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Residential Address</label>
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter residential address"
                    rows="3"
                    className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
            >
                Submit
            </button>
        </form>
    );
}
