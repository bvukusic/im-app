const styles = theme => ({

    content: {
      height: 'calc(100vh - 100px)',
      overflow: 'auto',
      padding: '25px',
      marginLeft: '300px',
      boxSizing: 'border-box',
      overflowY: 'scroll',
      top: '50px',
      width: 'calc(100% - 300px)',
      position: 'absolute'
    },
  
    userSent: {
      float: 'right',
      clear: 'both',
      padding: '20px',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '10px',
      backgroundColor: '#8f70c4',
      color: 'white',
      width: '300px',
      borderRadius: '10px'
    },
  
    friendSent: {
      float: 'left',
      clear: 'both',
      padding: '20px',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '10px',
      backgroundColor: '#707BC4',
      color: 'white',
      width: '300px',
      borderRadius: '10px'
    },
  
    chatHeader: {
      width: 'calc(100% - 301px)',
      height: '50px',
      backgroundColor: '#344195',
      position: 'fixed',
      marginLeft: '301px',
      fontSize: '18px',
      textAlign: 'center',
      color: 'white',
      paddingTop: '10px',
      boxSizing: 'border-box',
      '&::after' : {
        content: '',
        position: 'absolute',
        right: '0',
        top: '50%',
        width: '0',
        height: '0',
        border: '20px solid transparent',
        borderLeftColor: '#00aabb',
        borderRight: '0',
        borderBottom: '0',
        marginTop: '-10px',
        marginRight: '-20px'
      }
    }
  
  });
  
  export default styles;