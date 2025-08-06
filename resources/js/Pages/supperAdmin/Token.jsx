import SupperAdminLayout from '@/Layouts/SupperAdminLayout';
import TokenLayout from '@/token/tokenLayout';
import React from 'react';


function Token({ subAdmins, initialTokens }) {
    return (
        <SupperAdminLayout>
            <TokenLayout subAdmins={subAdmins} initialTokens={initialTokens} />
        </SupperAdminLayout>
    );
}

export default Token;