import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 0, name: 'John Doe', salary: 800, increase: true, rise: false },
        { id: 1, name: 'Alex White', salary: 3000, increase: false, rise: true },
        { id: 2, name: 'John Smith', salary: 1000, increase: true, rise: false },
        { id: 3, name: 'Richard Branson', salary: 6000, increase: false, rise: false },
      ],
      term: '',
      filter: 'all',
    };
  };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    });
  };

  addItem = (name, salary) => {
    const item = {
      id: new Date().valueOf(),
      name,
      salary,
      increase: false,
      rise: false,
    };

    if (name && salary) {
      this.setState(({ data }) => {
        const newArr = [...data, item];

        return {
          data: newArr,
        };
      });
    }
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }

        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return (item.name).toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  filterEmp = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);

      case 'salary':
        return items.filter(item => item.salary > 1000);

      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const employees = data.length;
    // const increased = data.reduce((acc, cur) => acc += cur.increase, 0);
    const increased = data.filter(item => item.increase).length;
    const sortedData = this.searchEmp(data, term);
    const visibleData = this.filterEmp(sortedData, filter);

    return (
      <div className="app">
        <AppInfo employees={ employees } increased={ increased } />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={ this.onUpdateSearch } />
          <AppFilter onFilterSelect={ this.onFilterSelect } filter={ filter } />
        </div>

        <EmployeesList
          data={ visibleData }
          onDelete={ this.deleteItem }
          onAdd={ this.addItem }
          onToggleProp={ this.onToggleProp }
        />
        <EmployeesAddForm onAdd={ this.addItem } />
      </div>
    );
  };
};

export default App;