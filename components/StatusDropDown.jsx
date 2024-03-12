import { Dropdown } from "antd"
import React from "react"

const status = [
    {
        key: "1", 
        label: "New"
    }, 
    {
        key: "2", 
        label: "In Progress"
    }, 
    {
        key: "3", 
        label: "Resolved"
    }
]


const StatusDropDown = ({updateStatus}) => {
    return (
        <Dropdown menu={{items: status, selectable: true, 
            onClick: ({key}) => updateStatus(key)}}>
           <a>Update Status</a> 
        </Dropdown>
    )
}

export default StatusDropDown; 