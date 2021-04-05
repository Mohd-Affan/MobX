import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {inject, observer} from 'mobx-react';

@inject('todoStore')
@observer
export default class Home extends Component {
  LongPress = (id) => {
    Alert.alert('Alert', 'Delete Note?', [
      {
        text: 'Ok',
        onPress: () => this.props.todoStore.deleteNote(id),
      },
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
    ]);
  };

  Press = ({id, title, content}) => {
    this.props.navigation.navigate('AddNote', {
      id: id,
      title: title,
      content: content,
    });
  };

  render() {
    const {notesArray} = this.props.todoStore;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <SafeAreaView style={styles.header}>
            <Text style={styles.headerText}> Simple Note Taker </Text>
          </SafeAreaView>
        </View>
        {notesArray.length !== 0 ? (
          notesArray.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.noteContainer}
                onLongPress={() => this.LongPress(item.id)}
                onPress={() => this.Press({...item})}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content}>{item.content}</Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyContainerText}>No Notes</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.props.navigation.navigate('AddNote')}>
          <Text style={styles.addButtonText}>+ Add New Note</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29E5B8',
  },
  header: {margin: 20, marginTop: 50},
  headerText: {fontSize: 18, color: 'gray', fontWeight: 'bold'},
  addButton: {
    backgroundColor: '#29E5B8',
    borderRadius: 50,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    right: 20,
    shadowColor: 'grey',
    shadowOpacity: 10,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowRadius: 5,
  },
  addButtonText: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 350,
  },
  emptyContainerText: {
    fontSize: 30,
    color: '#29E5B8',
  },
  noteContainer: {
    borderWidth: 2,
    borderColor: '#29E5B8',
    borderStyle: 'dashed',
    margin: 10,
  },
  title: {fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 10},
  content: {fontSize: 15, marginTop: 5, marginLeft: 10},
});
