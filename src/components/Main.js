import { Box, Button, Checkbox, CircularProgress, Container, Dialog, DialogContent, FormControlLabel, FormGroup, FormLabel, Grid, Link, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputStack from '../Tags/InputStack'



const Main = () => {
    
    
    const[name , setName] = useState('')
    const[email , setEmail] = useState('')
    const[website , setWebsite] = useState('')
    const[image , setImage] = useState(null)
    const[gender , setGender] = useState('')
    const[domain , setDomain] = useState('')
    const[applicants , setApplicants] = useState([])
    const[loading , setLoading] = useState(false)
    const[percentage , setPercentage] = useState(0)
    const [includeData , setIncludeData] = useState(false)
    const uploadImage = (e) =>{
        const file = e.target.files[0]
        setImage(file)
    }
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(percentage<100 && loading){
                setPercentage((prev) => prev+10)
            }
            else{
                setLoading(false)
                setPercentage(0)
                setIncludeData(true)
                clearInterval(interval)
            }
        },500);
        return () =>  clearInterval(interval)
    },[percentage ,loading])


  const  createStudent  = (e) =>{
    e.preventDefault()
    setLoading(true)
   
        const post =  {
          name :  name,
          email : email,
          website  : website,
          image : image,
          gender : gender,
          domain : domain   
        }
        if(includeData){
            setApplicants([post , ...applicants])
            setName('')
            setEmail('')
            setWebsite('')
            setImage(null)
            setGender('')
            setDomain('')
            setIncludeData(false)
        }
        
    
  }
  
    
    


  return (
    <>

    <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} display='flex' justifyContent='space-between'>
        <Container maxWidth='md'>
      <form onSubmit={createStudent}>
        <Stack direction='column' spacing={2}>
        <InputStack>
            <FormLabel>Name</FormLabel>
            <TextField required type='text' name='name' value={name} onChange={(e) => setName(e.target.value)}/>
        </InputStack>
        
        <InputStack>
            <FormLabel>Email</FormLabel>
            <TextField required type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputStack>
        
        <InputStack>
            <FormLabel>Website</FormLabel>
            <TextField required type='url' name='website' value={website} onChange={(e) => setWebsite(e.target.value)} />
        </InputStack>
        
        <InputStack>
            <FormLabel>Your Photo</FormLabel>
            <input required type='file' accept='image/*'   name='image'  onChange={uploadImage}/>
        </InputStack>

        <InputStack>
            <FormLabel>Gender</FormLabel>
            <RadioGroup  name='gender' defaultValue='male'  value={gender} onChange={(e) => setGender(e.target.value)}>
                <FormControlLabel required value='Male' control={<Radio/>} label='Male' />
                <FormControlLabel required  value='Female' control={<Radio/>} label='Female'/>
            </RadioGroup>
        </InputStack>
        
        <InputStack>
            <FormLabel>Domain</FormLabel>
            <RadioGroup  name='domain'   value={domain} onChange={(e) => setDomain(e.target.value)}>
                <InputStack>
                    <FormControlLabel required value='Web Developer' control={<Radio/>} label='Developer' />
                    <FormControlLabel required  value='Cloud Engineer' control={<Radio/>} label='Cloud Engineer'/>
                    <FormControlLabel required  value='Data Analyst' control={<Radio/>} label='Data Analyst'/>
                </InputStack>
                
            </RadioGroup>
        </InputStack>
        

        <Stack direction='row' spacing={2} display='flex' justifyContent='flex-end'>
            <Button variant='contained' type='submit' >Enroll Student</Button>
            <Button variant='outlined' type='reset'>Clear</Button>
        </Stack>

        </Stack>
      </form>
      </Container>
    </Grid>
        
      

        <Grid item lg={6} md={6} sm={12} display='flex' justifyContent='center' ><br/>
            
            <Box sx={{display:'flex' , justifyContent :'center'}}>
            
            <Stack direction='column' spacing={2}>
            <Typography variant='h5'   textAlign='center'  fontWeight='bold'>Enrolled Students</Typography>
            <Container maxWidth='md' sx={{display:'flex' , alignItems:'center' , justifyContent:'center'}} >
            {applicants.length===0||loading? 
            
            <Box  sx={{backgroundColor:'#009688',borderRadius:10,width:'40vw'}} >
                <Typography variant='h4' textAlign='center'>No data!</Typography>
            </Box>
            
            :
            <Table sx={{border:'solid 1px black'}}>
                
                <TableHead sx={{border:'solid 1px black'}}>
                    <TableRow>
                        <TableCell sx={{width:400 , fontSize:18}}>Description</TableCell>
                        <TableCell sx={{ fontSize:18}}>Image</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
            {applicants.map((value , index)=>(
                <TableRow key={index} sx={{border:'solid 1px black'}}>
                    <TableCell>
                        <Stack direction='column'>
                            <Typography variant='body1'>{value.name}</Typography>
                            <Typography variant='body1'>{value.gender}</Typography>
                            <Typography variant='body1'>{value.email}</Typography>
                            <Typography component={Link} href={value.website} variant='body1' fontStyle='italic'>{value.website}</Typography>
                            <Typography variant='body1'>{value.domain}</Typography>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <img style={{width:150,height:100}} src={URL.createObjectURL(value.image)} alt=''/>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>}
            </Container>  
        </Stack>
        </Box>
        </Grid>
      </Grid>
    
    <Dialog open={loading} onClose={!loading} sx={{backgroundColor:'#009688' , opacity:0.3}} >
        <DialogContent >
            <Stack direction='column' display='flex' alignItems='center' justifyContent='center'>
            <CircularProgress/>
            <Typography variant='h6'>Loading {percentage}%</Typography>
            
            </Stack>
        </DialogContent>
    </Dialog>
    
    </>
  )
}

export default Main
