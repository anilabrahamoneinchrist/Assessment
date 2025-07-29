
import React, { useState, useEffect } from 'react';

export type ApiStatus = 'Development' | 'Production' | 'Deprecated';

export interface Api {
  id: string;  
  name: string;    
  status: ApiStatus; 
  url: string;    
}


interface ApiListProps {
  apis: Api[];
}

const STATUS_OPTIONS: ApiStatus[] = ['Development', 'Production', 'Deprecated'];
const LOCAL_STORAGE_KEY = 'apiFilterStatus';

const ApiList: React.FC<ApiListProps> = ({ apis }) => {
  // State for the selected status filter
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    const persisted = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (persisted) setSelectedStatus(persisted);
  }, []);

 
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, selectedStatus);
  }, [selectedStatus]);


  const filteredApis =
    selectedStatus === ''
      ? apis
      : apis.filter((api) => api.status === selectedStatus);

  return (
    <div>
      <h2>API List</h2>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="status-filter">Filter by status: </label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      {filteredApis.length === 0 ? (
        <div>No APIs found matching the selected criteria.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>URL</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredApis.map((api) => (
              <tr key={api.id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{api.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{api.url}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{api.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApiList;
