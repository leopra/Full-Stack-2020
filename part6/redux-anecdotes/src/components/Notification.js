
import React from 'react'
import { connect } from 'react-redux'

const Notification = ({notification}) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications.message,
  };
};

const NotificationCon = connect(mapStateToProps)(Notification);
export default NotificationCon;