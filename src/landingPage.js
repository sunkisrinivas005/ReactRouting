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
    filterData : []
  };

  componentWillMount = () => {
    let filterData = data.map(i => i.ULB).map(i => {
      return {text : i.toUpperCase() , value : i}
    });
     this.setState({
      filterData
     })

  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
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
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'ULB' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'State',
        dataIndex: 'State',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Parcels',
        dataIndex: 'Parcels',
        key: 'Parcels',
        ellipsis: true,
      },
      {
        title: 'Agencies',
        dataIndex: 'Agencies',
        key: 'Agencies',
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
        ellipsis: true,
      }
    ];
    return (
      <div style = {{marginTop : "100px", width: "95%", marginLeft: "3%"}}>
      <div className="table-operations">
          <Button onClick={this.setAgeSort}>Sort age</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  }
}


export default withRouter(LandingPage);
