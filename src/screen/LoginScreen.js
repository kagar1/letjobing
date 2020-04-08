import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import LoginInput from '../component/LoginInput';
import {db} from '../firebase/FirebaseConnexion'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: '',
      loginPassword:''
    };
    this.isUserEmail = false
    this.isUserPass = false
  }

  // on login fields change text
  _emailChange(text){
    this.setState({
      loginEmail: text
    })
  }
  _passwordChange(text){
    this.setState({
      loginPassword: text
    })
  }
  
  //function which is trigerred when login click button
  _loginClick(){
    if (this.state.loginEmail == '' || this.state.loginPassword =='') {
      alert('Make sure to fill login fields')
    } else {

      db.ref('Users').on('value', (data)=>{
        data.forEach((doc)=>{
          if(this.state.loginEmail == doc.toJSON().email){
            this.isUserEmail = true
            if ( this.state.loginPassword == doc.toJSON().password) {
              this.isUserPass = true
              
            }else{
              this.isUserPass = false
              
            }

          }else{
            this.isUserEmail = false
          }
        })

        if (this.isUserEmail && this.isUserPass) {
          this.props.navigation.navigate('Home')
        }

        if (this.isUserEmail && !this.isUserPass) {
          alert('your password is incorrect')
        }

        if (!this.isUserEmail) {
          alert('Email incorrect, Create Your Account')
        }
      })
      
    }
    
  }

  render() {
    return (
      <ImageBackground source={require('../pictures/font1.png')} style={styles.smallcontainer}>
          <View style={styles.test}>
         
            <View style={styles.blockImg}>
              <Image style={styles.picture} source = {require('../pictures/letjob.png')} />
            </View>
            <View>
              <View style ={styles.vue}> 
                <TextInput 
                    style = {styles.input}
                    placeholder = 'Email...'
                    placeholderTextColor = '#e9f5f0'
                    autoCapitalize = {false}
                    onChangeText={(text)=>this._emailChange(text)}
                />
              </View>
              <View style ={styles.vue}> 
                <TextInput 
                    style = {styles.input}
                    placeholder = 'Password...'
                    placeholderTextColor = '#e9f5f0'
                    secureTextEntry = {true}
                    onChangeText = {(text)=>this._passwordChange(text)}
                />
              </View>
            </View>
            <View>
              <View style={styles.loginbutton}>
                
                <TouchableOpacity
                  style={styles.buttonlogin}
                  onPress={()=>this._loginClick()}
                >
                  <Text style={styles.labelbutton}> Login</Text>
                </TouchableOpacity>
              </View>
              <View>
                

                <TouchableOpacity
                  style={styles.buttonregister}
                  onPress={() => this.props.navigation.navigate('Subscription')}
                >
                  <Text style={styles.labelbutton}> Subscription</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      </ImageBackground>
      
    );
  }
}

const styles = StyleSheet.create({
    test :{
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        paddingLeft:25,
        paddingRight:25,
        marginTop: 100
       
    },
    smallcontainer:{
      flex:1,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor:'#14e39e',
      
    },
    picture:{
      width : 250,
      height: 150,
    },
    blockImg:{
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center'
    },
    loginbutton:{
      marginBottom:20
    },
    
    buttonlogin: {
      alignItems: 'center',
      backgroundColor: '#d111c1',
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor:'black'
    },
    buttonregister: {
      alignItems: 'center',
      backgroundColor: '#111582',
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor:'black'
    },
    labelbutton:{
      color: "white",
      fontSize: 17,
      fontWeight:'bold'
    },
    input:{
      borderBottomColor:'#6d7873',
      height: 40,
      borderBottomWidth:4,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      fontSize: 16
    },
    vue:{
      marginBottom: 40
    }
    
})
