const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginTop: '30px',
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
      width: '90%',
      marginTop: theme.spacing.unit,
      marginLeft: '20px',
      paddingBottom: '20px'
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    hasAccountHeader: {
      width: '100%'
    },
    logInLink: {
      width: '100%',
      textDecoration: 'none',
      color: '#303f9f',
      fontWeight: 'bolder'
    },
    errorText: {
      color: 'red',
      textAlign: 'center'
    }
  });
  
  export default styles;