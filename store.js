import { createStore } from 'redux';

// Define the initial state
const initialState = {
  value: '',
};

// Define the reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer);

export default store;

import React from 'react';
import { connect } from 'react-redux';

class ComponentB extends React.Component {
  handleChange = (event) => {
    const { setValue } = this.props;
    const value = event.target.value;
    setValue(value);
  };

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
      </div>
    );
  }
}

// Define the action creator to set the value
const setValue = (value) => ({
  type: 'SET_VALUE',
  payload: value,
});

// Connect ComponentB to the Redux store
const mapStateToProps = () => ({});
const mapDispatchToProps = {
  setValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentB);

import React from 'react';
import { connect } from 'react-redux';

class ComponentC extends React.Component {
  render() {
    const { value } = this.props;
    return (
      <div>
        <p>Value: {value}</p>
      </div>
    );
  }
}

// Connect ComponentC to the Redux store
const mapStateToProps = (state) => ({
  value: state.value,
});

export default connect(mapStateToProps)(ComponentC);

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ComponentB from './ComponentB';
import ComponentC from './ComponentC';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ComponentB />
          <ComponentC />
        </div>
      </Provider>
    );
  }
}

export default App;
