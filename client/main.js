import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';
import './main.html';


Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

Template.body.helpers({
  // notes:[
  //     {text:'My note 1'},
  //     {text:'My note 2'},
  //     {text:'My note 3'}
  //   ]
  
  notes(){
    return Notes.find({});
  }
})

Template.add.events({
  'submit .add-form':function(){
    event.preventDefault();
    console.log(123);
    
    const target = event.target;
    const text = target.text.value;
    console.log(text);
    
    // Notes.insert({
    //   text,
    //   createdAt: new Date(),
    //   owener:Meteor.userId(),
    //   username:Meteor.user().username
    // });
    Meteor.call('notes.insert',text)
    target.text.value='';
    
    $('#addModal').modal('close');
    
    return false;
    
    
  }
})

Template.note.events({
  'click .delete-note':function(){
    // Notes.remove(this._id);
    Meteor.call('notes.remove',this)
    return false;
  }
})