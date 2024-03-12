import { Table, Space, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import StatusDropDown from "./StatusDropDown";


const statuses = {
    "New": "red", 
    "In Progress": "yellow", 
    "Resolved": "green", 
}


const AdminPanel = () => {
    const [supportTickets, setSupportTickets] = useState([]); 

    const updateStatus = (id) => {
        return (status) => {  
            axios.post(" https://supportticketbackend.azurewebsites.net/supportTicket/updateStatus", {
                id, status
            })
            .then(({status, data}) => {
                if(status === 200) { 
                    const updatedSupportTicket = data[0];
                    const updatedSupportTickets = supportTickets.map(supportTicket => supportTicket.ID === id ? { ...supportTicket, Status: updatedSupportTicket.Status } : supportTicket); 
                    setSupportTickets(updatedSupportTickets);
                }
            })
            .catch((err) => console.error('ERR: ', err));;
        }
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'Name',
          key: 'Name',
        },
        {
          title: 'Email',
          dataIndex: 'Email',
          key: 'Email',
        },
        {
          title: 'Description',
          dataIndex: 'Description',
          key: 'Description',
        },
        {
          title: 'Status',
          key: 'Status',
          dataIndex: 'Status',
          render: (_, { Status }) => {
            return (
                
                      <Tag color={statuses[Status]} key={Status}>
                        {Status}
                      </Tag>
    
            )
          }
        },
        {
          key: 'UpdateStatus',
          render: (_, record) => (
            <StatusDropDown updateStatus={updateStatus(record.ID)}/>
          ),
        },
      ];


    useEffect(() => {
        axios.get("https://supportticketbackend.azurewebsites.net/supportTicket/getRequests")
        .then((res) => {
            
            setSupportTickets(res.data);
        })
        .catch((err) => console.error('ERR: ', err));;
      
    }, []);  

    return (
        <Table columns={columns} dataSource={supportTickets} rowKey={'ID'}/> 
    ); 
}

export default AdminPanel; 