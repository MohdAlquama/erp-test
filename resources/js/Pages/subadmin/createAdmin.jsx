import TabComponent from '@/components/createAdmin/tapComponents';
import SubAdminLayout from '@/Layouts/SubAdminLayout'
import React from 'react'

function CreateAdmin() {
  return (
    <SubAdminLayout>
 <div className="w-full">
        <TabComponent />
      </div>    </SubAdminLayout>
  );
    
}

export default CreateAdmin
