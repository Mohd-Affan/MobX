import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'mobx-react';
import Route from './src/navigate/Route';
import ToDoStore from './src/store/ToDoStore';

export default class App extends Component {
  render() {
    const todoStore = new ToDoStore();
    return (
      <Provider todoStore={todoStore}>
        <Route />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
