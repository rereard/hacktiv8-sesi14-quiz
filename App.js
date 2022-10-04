/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App: () => Node = () => {
  const [data, setData] = useState([])
  const [textValue, setTextValue] = useState('')
  const [edit, setEdit] = useState({})
  const editData = (data) => {
    setEdit(data)
    setTextValue(data.value)
  }
  const cancelEditData = () => {
    setEdit({})
    setTextValue('')
  }
  const addData = () => {
    if(edit.id){
      const updatedData = {
        ...edit,
        id: edit.id,
        value: textValue
      }
      const indexEdited = data.findIndex((d) => d.id === edit.id)
      const updatedDataList = [...data]
      updatedDataList[indexEdited] = updatedData
      setData(updatedDataList)
      return cancelEditData()
    }
    setData([...data, {id: makeid(5), value: textValue}])
    setTextValue('')
  }
  const deleteData = (id) => {
    const filteredData = data.filter((d) => d.id !== id)
    setData(filteredData)
    if(edit.id){
      cancelEditData()
    }
  }
  const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
          <Text style={styles.headerText}>CRUD on React Native</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>Input Anything</Text>
          <TextInput style={styles.inputText} placeholder="Input Here..." onChangeText={value => setTextValue(value)} value={textValue}/>
          <View style={styles.input}>
            <TouchableOpacity style={styles.button} onPress={() => textValue !== '' && addData()}>
              <Text style={styles.contentText}>{edit.id ? 'Edit' : 'Enter'}</Text>
            </TouchableOpacity>
            {edit.id && (
              <TouchableOpacity style={styles.button} onPress={cancelEditData}>
                <Text style={styles.contentText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
          {data.map((d) => (
            <View key={d.id} style={styles.listView}>
              <Text style={styles.listText}>{d.value}</Text>
              <View style={styles.listAction}>
                <TouchableOpacity style={styles.button} onPress={()=>editData(d)}>
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>deleteData(d.id)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: 20
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contentText: {
    fontSize: 20
  },
  listView: {
    borderBottomWidth: 1,
    marginTop: 10,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listAction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
  }, 
  input: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  }, 
  listText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  content: {
    padding: 10,
    marginTop: 5
  },
  inputText: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 5,
    fontSize: 20
  },
  button: {
    backgroundColor: 'gray',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15
  }
});

export default App;
