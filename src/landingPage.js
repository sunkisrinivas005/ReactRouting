import React from 'react';
import {withRouter} from 'react-router-dom';
import {isAuthenticated } from './Auth/Auth.js';
import { Table, Button } from 'antd';
import {data} from './data.js';
require('./styles.css');  
class LandingPage extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    filterData : [],
    AgenciesData : []
  };

  componentWillMount = () => {
    let filterData = data.map(i => i.ULB).map(i => {
      return {text :i , value : i}
    });
     this.setState({
      filterData
     })

  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'ULB',
      },
    });
  };

  render() {
    let { sortedInfo, filteredInfo, filterData } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'ULB',
        dataIndex: 'ULB',
        key: 'ULB',
        filters: filterData,
        filteredValue: filteredInfo.ULB || null,
         onFilter: (value, record) => record.ULB.includes(value),
        sortOrder: sortedInfo.columnKey === 'ULB' && sortedInfo.order,
        sorter: (a, b) => a.ULB.length - b.ULB.length,
        sortDirections: ['descend'],
        ellipsis: true,
      },
      {
        title: 'State',
        dataIndex: 'State',
        key: 'State',
        ellipsis: true,
      },
      {
        title: 'Parcels',
        dataIndex: 'Parcels',
        key: 'Parcels',
        sorter: (a, b) => a.Parcels - b.Parcels,
        sortOrder: sortedInfo.columnKey === 'Parcels' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Agencies',
        dataIndex: 'Agencies',
        key: 'Agencies',
        filters: [{text: "Agency-1", value : "Agency-1"}, {text: "Agency-2", value :"Agency-2"}],
        filteredValue: filteredInfo.Agencies || null,
        onFilter: (value, record) => record.Agencies.includes(value),
        ellipsis: true,
      },
      {
        title: 'Portions',
        dataIndex: 'Portions',
        key: 'Portions',
        ellipsis: true,
      },
      {
        title: 'Agents',
        dataIndex: 'Agents',
        key: 'Agents',
        sorter: (a, b) => a.Agents - b.Agents,
        sortOrder: sortedInfo.columnKey === 'Agents' && sortedInfo.order,
        ellipsis: true,
      },{
        title: 'Lifetime',
        dataIndex: 'Lifetime',
        key: 'Lifetime',
        filters: [{text: "Level-1", value : "Level-1"}, {text: "Level-2", value :"Level-2"}],
        filteredValue: filteredInfo.Lifetime || null,
        onFilter: (value, record) => record.Lifetime.includes(value),
        ellipsis: true,
      }
    ];
    return (
      <div style = {{marginTop: "100px", width: "95%", marginLeft: "3%"}}>
      <h3 style ={{display: "flex", alignSelf: "center", flexDirection : "row", justifyContent : "center", fontFamily : "Lato"}}>ULB Result Sheet</h3>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} style ={{marginTop :"25px"}} />
      </div>
    );
  }
}


export default withRouter(LandingPage);
