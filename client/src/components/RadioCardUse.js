import { useRadio,Box,useRadioGroup,HStack } from '@chakra-ui/react'
// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    // console.log("the value is: ",input.value);
    const checkbox = getCheckboxProps()
    // console.log("checkbox value is: ",checkbox);
    // props.userTypeHandler(input.value)
    return (
      <Box as='label'>
        <input {...input} onClick={()=>{props.userTypeHandler(input.value)}}/>
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            bg: 'blue.400',
            color: 'white',
            borderColor: 'blue.300',

          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    )
  }
  
  // Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
  export default function RadioCardUse(props) {
    const options = ['Manufacturer', 'Seller', 'Buyer']
  
    const { getRootProps, getRadioProps } = useRadioGroup({
      name: 'framework',
      defaultValue: 'react',
      // onChange: console.log,
    })
  
    const group = getRootProps()
    // console.log(group)
  
    return (
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <RadioCard key={value} {...radio} userTypeHandler={props.userTypeHandler}>
              {value}
            </RadioCard>
          )
        })}
      </HStack>
    )
  }