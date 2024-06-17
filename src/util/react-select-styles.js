const customStyles= {
    control: (baseStyles)=> ({
      ...baseStyles,
      margin: '0.5rem 0rem',
      color: '#c6c6c6',
      padding: '0.5rem',
      fontSize: '1.3rem',
      backgroundColor: '#264650',
      border: '0.3rem solid black',
      borderRadius: '5px',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: '#264650',
      color: '#c6c6c6',
      border: '0.3rem solid black',
    }),
    option: (baseStyles, {isFocused}) => ({
      ...baseStyles,
      backgroundColor: isFocused ? '#171b27' : null
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: '#c6c6c6'
    })
  }

  export default customStyles;