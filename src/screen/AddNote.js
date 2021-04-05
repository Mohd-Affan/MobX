import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {inject, observer} from 'mobx-react';

@inject('todoStore')
@observer
export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: '',
      content: '',
    };
  }

  Click = () => {
    const data = {
      id:
        this.state.id !== null
          ? this.state.id
          : this.props.todoStore.notesArray.length,
      title: this.state.title,
      content: this.state.content,
    };
    this.props.todoStore.addNote(data);
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  componentDidMount() {
    if (this.props.route.params) {
      this.setState({
        id: this.props.route.params.id,
        title: this.props.route.params.title,
        content: this.props.route.params.content,
      });
    }
  }
  render() {
    const {title, content} = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <SafeAreaView style={styles.header}>
            <Text style={styles.headerText}> Add a new note </Text>
          </SafeAreaView>
          <TouchableOpacity
            style={styles.crossButton}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Image
              style={styles.crossImage}
              source={require('../assets/cross.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={
              this.state.isTitleFocused
                ? styles.focusedInput
                : styles.unFocusedInput
            }
            placeholder="Add Title Here"
            value={title}
            onFocus={() => this.setState({isTitleFocused: true})}
            onBlur={() => this.setState({isTitleFocused: false})}
            onChangeText={(text) => this.setState({title: text})}
          />
          <TextInput
            value={content}
            style={styles.noteInput}
            placeholder="Add Note Here"
            onChangeText={(text) => this.setState({content: text})}
          />
        </View>
        <TouchableOpacity style={styles.checkImageButton} onPress={this.Click}>
          <Image
            style={styles.checkImage}
            source={require('../assets/check.png')}
          />
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
  crossImage: {width: 30, height: 30},
  crossButton: {position: 'absolute', right: 10, top: 46},
  unFocusedInput: {
    margin: 20,
    borderWidth: 1,
    borderColor: 'gray',
    height: 50,
    fontSize: 25,
    borderRadius: 7,
    paddingLeft: 10,
  },
  focusedInput: {
    margin: 20,
    borderWidth: 1,
    borderColor: 'purple',
    height: 50,
    fontSize: 25,
    borderRadius: 7,
    paddingLeft: 10,
  },
  noteInput: {
    margin: 20,
    borderWidth: 0.3,
    borderColor: 'gray',
    height: 300,
    fontSize: 20,
    borderRadius: 7,
    paddingLeft: 10,
    backgroundColor: 'lightgrey',
  },
  checkImage: {
    width: 30,
    height: 30,
  },
  checkImageButton: {
    position: 'absolute',
    bottom: 60,
    right: 30,
  },
});
