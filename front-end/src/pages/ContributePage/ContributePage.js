import React, { useState,useEffect } from 'react'
import FileUpload from './FileUpload.js'
import axios from 'axios';
import Table from './Table.js'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import { contributeStyle } from './ContributePage.style';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DatePickerCustom from './DatePickerCustom.js';
import extractInfo from './extractInfo.js';
const gsValue = [0,1,2,3,4];
const bComps  = ["Free Crystal","Altered Material","Lithic","Juvenile"];
const jTypes = ["Recycled Juvenile","Hydrothermally Altered Juvenile","Juvenile"]
const cTypes = ["Plagioclase","Pyroxene", "Amfibole","Sulfur"]
const aTypes = ["Weathered Material", "Hydrothermally Altered Material"];
const crystallinity = ["Low Black", "Low Transparent", "Mid Black", "Mid Transparent","High Black", "High Transparent"];
const alterations = ["None", "Slight", "Moderate", "High"];
const shapes = ["Blocky", "Fluidal", "Microtubular","Highly vesicular","Spongy","Pumice"]
const dateFormatValues = ["mm/dd/yyyy", "mm/yyyy", "Year only", "Years BP", "Unknown"]
const booleanList = {
  "Yes": true,
  "No": false
}
function ContributePage(props) {
    const classes = contributeStyle();
    const navigate = useNavigate();
    function changeLocation(placeToGo){
      navigate(placeToGo, { replace: true });
      window.location.reload();
    }
    const [isLoading, setIsLoading] = useState()
    const [volcanoList, setVolcanoList] = useState([])
    useEffect(()=>{
      axios.get("/volcanoe/getVolcanoes")
      .then(response => {
        if(response.data.success){
          let newVolcanoList = []
          response.data.volcanoes.map(volcano=>{
            newVolcanoList.push({
              label: volcano.volc_name,
              id: volcano.volc_num
            })
          })
          setVolcanoList(newVolcanoList)
        } else{
          alert("Failed to fetch data")
        }
      })
    },[])
    const [volcName, setVolcName] = useState("");
    const [volcID,setVolcID] = useState()
    const [volcValid,setVolcValid] = useState({
        error:false,
        helperText:""
    })
    const [afeFormat, setAFEFormat] = useState("")
    const [afeDate,setAFEDate] = useState(null)
    const [afeYearsBP, setAFEYearsBP] = useState()
    const [eruption,setEd] = useState()
    const [sampleFormat, setSampleFormat] = useState("")
    const [sampleDate,setSampleDate] = useState(null)
    const [sampleYearsBP, setSampleYearsBP] = useState()
    const [eruptionList, setEList] = useState([])
    const [eStartDate, setEStart] = useState({
      date:null,
      helperText:""
    })
    const [eStartValid,setEStartValid] =useState({
      error:false,
      helperText:""
    })
    const [eEndDate, setEEnd] = useState({
      date:null,
      helperText:""
    })
    const [eEndValid,setEEndValid] =useState({
      error:false,
      helperText:""
    })
    const [sampleLon,setSampleLon] = useState()
    const [sampleLat,setSampleLat] = useState()
    const [followConvention, setFollow] = useState(null)
    const [followValid,setFollowValid] = useState({
      error:false,
      helperText:""
  })
    const [magnification, setMg] = useState(null);
    const [magValid,setMagValid] = useState({
        error:false,
        helperText:""
    })
    const [gsLow,setGsLow] = useState();
    const [gsLowValid,setGsLowValid] = useState({
        error:false,
        helperText:""
    })
    const [gsUp,setGsUp] = useState();
    const [gsUpValid,setGsUpValid] = useState({
        error:false,
        helperText:""
    })
    const [bComp,setBComp] = useState("");
    const [cType,setCType] = useState("")
    const [aType,setAType] = useState("")
    const [jType,setJType] = useState("")
    const [crys,setCrys] = useState("");
    const [alteration, setAlt] = useState("");
    const [shape, setShape] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false)
    const [data,setData] = useState([])
    const [afeList,setAFEList] = useState([])
    const [sampleList, setSampleList] = useState([])
    const [Images, setImages] = useState([])
    const [addable, setAddable] = useState(false)
    useEffect(()=>{
      if(volcID && (afeDate || afeYearsBP) ){
        if(afeFormat=="Years BP"){
          axios.get(`/eruption/nearest_eruptions_yearsBP?yearsBP=${afeYearsBP}&volc=${volcID}`)
          .then(res=>{
            let newEList = []
            res.data.map(e=>{
              newEList.push({
                volc_num: e.volc_num,
                ed_code : e.ed_code,
                ed_yearsBP: e.ed_yearsBP
              })
            })
            newEList.push("Unknown")
            setEList(newEList)
          })
        }
        else{
          axios.get(`/eruption/nearest_eruptions?afe_date=${afeDate}&volc=${volcID}`)
          .then(res=>{
            // if(res.data.length!=0){
            //   setEStart({
            //     date:res.data[0].ed_stime.slice(0,10), // change 2000-12-30T00:00:00.000Z to 2000-12-30
            //     helperText:""
            //   })
            //   setEEnd({
            //     date:res.data[0].ed_etime.slice(0,10), // change 2000-12-30T00:00:00.000Z to 2000-12-30
            //     helperText:""
            //   })
            // }else{
            //   setEStart({
            //     date:null,
            //     helperText:"No Eruption Found"
            //   })
            //   setEEnd({
            //     date:null,
            //     helperText:""
            //   })
            // }
            let newEList = []
            res.data.map(e=>{
              newEList.push({
                volc_num: e.volc_num,
                ed_code : e.ed_code,
                ed_stime: e.ed_stime,
                ed_etime: e.ed_etime,
              })
            })
            newEList.push("Unknown")
            newEList.push("Add new Eruption")
            setEList(newEList)
          })
          .catch(err=>console.log(err))
      }
    }
    },[volcID,afeDate,afeYearsBP])
    const onVolcChange = (newValue)=>{
      if(newValue){
        setVolcName(newValue.label);
        setVolcID(newValue.id)
      } 
    }
    const onAFEFormatChange = (event)=>{
      setAFEFormat(event.target.value)
    }
    const onAFEYearsBPChange = (event)=>{    
      let yearsBP = 0-Math.abs(event.target.value)
      setAFEYearsBP(yearsBP)
    }
    const onSampleFormatChange = (event)=>{
      setSampleFormat(event.target.value)
    }
    const onSampleYearsBPChange = (event)=>{
      let yearsBP = 0-Math.abs(event.target.value)
      setSampleYearsBP(yearsBP)
    }
    const onSampleLonChange = (event)=>{
      const value = event.target.value
      if (value >90){setSampleLon(90)}
      else if (value<0){setSampleLon(0)}
      else {setSampleLon(value)}
  }
  const onSampleLatChange = (event)=>{
      const value = event.target.value
      if (value >90){setSampleLat(90)}
      else if (value<0){setSampleLat(0)}
      else {setSampleLat(value)}
  }
    const onFollowChange = (event)=>{
      setFollow(event.target.value)
    }
    const onMgChange = (event)=>{
      setMg(event.target.value)
    } 
    const onGsLowChange = (event)=>{
        setGsLow(event.target.value)
    } 
    const onGsUpChange = (event)=>{
      setGsUp(event.target.value)
    } 
    const onBCompChange = (event)=>{
      setBComp(event.target.value)
    } 
    const onCTypeChange = (event)=>{
      setCType(event.target.value)
    } 
    const onATypeChange = (event)=>{
      setAType(event.target.value)
    } 
    const onJTypeChange = (event)=>{
      setJType(event.target.value)
    } 
    const onCrysChange = (event)=>{
      setCrys(event.target.value)
    } 
    const onAltChange = (event)=>{
      setAlt(event.target.value)
    } 
    const onShapeChange = (event)=>{
      setShape(event.target.value)
    } 
    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const checkValidData = ()=>{
      let valid = true;
      const nullError={
        error:true,
        helperText:"This field cannot be blank"
      }
      const isValid={
        error:false,
        helperText:""
      }
      if(!volcName){setVolcValid(nullError);valid=false}
      else{
        setVolcValid(isValid);
      }
      if(eStartDate.date){
        if(eEndDate.date){
          if(eStartDate.date>eEndDate.date){
            setEStartValid({
              error:true,
              helperText:"Eruption Start Date cannot be later than End Date"
            })
            valid=false
          }
        }else{
          if(afeDate.date>eStartDate.date){
            setEStartValid({
              error:true,
              helperText:"Eruption Start Date cannot be after Ash Emission Date"
            })
            valid=false
          }else{
            setEStartValid(isValid)
          }
        }
      }else{
        if(eEndDate.date){
          setEEndValid({
            error:true,
            helperText:"Please fill Start Date first!"
          })
          valid=false
        }else{
          setEEndValid(isValid)
        }
      }
      if(followConvention==null){setFollowValid(nullError);valid=false}
      else{
        setFollowValid(isValid);
      }
      if(followConvention==false){
        if(magnification==null){setMagValid(nullError);valid=false}
        else{
          setMagValid(isValid);
        }

        if(gsLow==null){setGsLowValid(nullError);valid=false}
        else{
          setGsLowValid(isValid);
        }
        if(gsUp==null){setGsUpValid(nullError);valid=false}
        else{
          setGsUpValid(isValid);
        }
        if(gsLow!=null && gsUp!=null && gsLow>gsUp){
          setGsLowValid({
            error:true,
            helperText:"Lower Bound cannot not be greater than Lower Bound"
          })
          valid=false
        }
    }

      return valid;
    }
    const handleTableClick = ()=>{
      if(checkValidData()){
        setButtonClicked(true)
        if(followConvention==false){
          let newData = []
          for(var i =0;i<Images.length;i++){
              const particle={
                volc_name: volcName,
                mag: magnification,
                gsLow: gsLow,
                gsUp: gsUp,
                bComp: bComp,
                crys: crys,
                alteration: alteration,
                shape: shape,
                image_name:Images[i].split("_").slice(1).join("_").slice(0,-4),
                image_path:Images[i]
              }
              newData.push(particle)

          }
          setData(newData)
        }else if (followConvention==true){
          let newData = []
          let newAFEList = []
          let newSampleList = []
          for(var i=0;i<Images.length;i++){
            const image_path = Images[i]
            const image_name = Images[i].split("_").slice(1).join("_").slice(0,-4)
            const info = extractInfo(image_name,volcID,image_path)
            if (info == undefined) {alert (`Your file ${image_name} are not following our naming convention`)}
            else {
                const changeToPascalCase =(s)=>{
                let arr = s.split(" ")
                for(var i=0;i<arr.length;i++){
                    arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1)
                }
                return arr.join(" ")
                }
                const par = info.particle
                newAFEList.push(info.afe)
                newSampleList.push(info.sample)
                const particle = {
                  volc_name: volcName,
                  id: par.id,
                  mag: par.magnification,
                  gsLow: par.gsLow,
                  gsUp: par.gsUp,
                  multi_focus: par.multi_focus,
                  image_name: image_name,
                  image_path:image_path
                }
                if(par.index){ particle.index = par.index}
                if(par.main_type){ particle.mType = changeToPascalCase(par.main_type)}
                if(par.sub_type){ particle.sType = changeToPascalCase(par.sub_type)}
                if(par.crystallinity){ particle.crys = changeToPascalCase(par.crystallinity)}
                if(par.color){ particle.color = changeToPascalCase(par.color)}
                if(par.hydro_alter_degree){ particle.hydro_alter_degree = changeToPascalCase(par.hydro_alter_degree)}
                if(par.shape){ particle.shape = changeToPascalCase(par.shape)}
                console.log(particle.sType)
                newData.push(particle)
                
            }
          }
          setData(newData)
          setAFEList(newAFEList)
          setSampleList(newSampleList)
        }
      }
    }
    const groupData = (data)=>{
      let group = {}
      var idCounter = 0
      for (var i=0;i<data.length;i++){
        const breakDown = data[i].image_name.split("_")
        if(breakDown.length==1 || isNaN(breakDown[breakDown.length-1])){
          const key = data[i].image_name
            if(group[key]!==undefined){
              group[key].dataList[0] = data[i]
            }else{
              group[key]={}
              group[key].id = idCounter++
              group[key].dataList={
                "0": data[i]
              }
            }
        }else{
          const key = breakDown.slice(0,-1).join("_")
          const index = breakDown[breakDown.length-1]
          if(group[key]!==undefined){
            group[key].dataList[index] = data[i]
          }else{
            group[key]={}
              group[key].id = idCounter++
              group[key].dataList={}
              group[key].dataList[index] = data[i]
          }
        }
      }
      return group
    }
    const [failed, setFailed] = useState(false)
    const [afeCode, setAFECode] = useState(null)
    const onSubmit = async(event) => {
        event.preventDefault();
        if(checkValidData()){
          setIsLoading(true)
          if (eruption && eruption.ed_code){
            axios.get(`/afe/next_afe_code?ed=${eruption.ed_code}`).then((res)=>{
              setAFECode(res.data)
              let afe = {
                volc_num : volcID,
                volc_name:volcName,
                afe_code: res.data,
              }
              if(afeDate) afe.afe_date = afeDate
              if(afeYearsBP) afe.yearsBP = afeYearsBP
              axios.post("/afe/afes/add",afe)
               .catch(err=> console.log(err),setFailed(true))
            }).catch(err=> console.log(err),setFailed(true))
          }else if(!addable){
            if(afeDate){
              axios.get(`/eruption/post_eruption?date=${afeDate}&volc=${volcID}`).then((res)=>{
                let ed_code_post = res.data.ed_code +"post"
                axios.get(`/afe/next_afe_code?ed=${ed_code_post}`).then((res)=>{
                  setAFECode(res.data)
                  let afe = {
                    volc_num : volcID,
                    volc_name:volcName,
                    afe_code: res.data,
                    afe_date : afeDate
                  }
                  axios.post("/afe/afes/add",afe)
                   .catch(err=> console.log(err),setFailed(true))
                }).catch(err=> console.log(err),setFailed(true))
              }).catch(err=> console.log(err),setFailed(true))
            }
            if(afeYearsBP){
              axios.get(`/eruption/post_eruption_yearsBP?yearsBP=${afeYearsBP}&volc=${volcID}`).then((res)=>{
                let ed_code_post = res.data.ed_code +"post"
                axios.get(`/afe/next_afe_code?ed=${ed_code_post}`).then((res)=>{
                  setAFECode(res.data)
                  let afe = {
                    volc_num : volcID,
                    volc_name:volcName,
                    afe_code: res.data,
                    yearsBP : afeYearsBP
                  }
                  axios.post("/afe/afes/add",afe)
                   .catch(err=> console.log(err),setFailed(true))
                }).catch(err=> console.log(err),setFailed(true))
              }).catch(err=> console.log(err),setFailed(true))
            }
          }else if(addable){
            axios.get(`/eruption/next_eruption_code?volc=${volcID}`).then(res=>{
              console.log(res.data)
              const eruption={
                in_GVP: false,
                ed_code: res.data,
                volc_num: volcID,
                volc_name: volcName
              }
              if(eStartDate.date) {eruption.ed_stime = eStartDate.date}
              if(eEndDate.date) {eruption.ed_etime = eEndDate.date}
              axios.post("/eruption/eruptions/add",eruption)
              .catch(err=> console.log(err),setFailed(true))
              let afeCode = res.data + "_DB0"
              setAFECode(afeCode)
              let afe={
                volc_num: volcID,
                volc_name: volcName,
                afe_code: afeCode
              }
              if(afeDate) afe.afe_date = afeDate
              if(afeYearsBP) afe.yearsBP = afeYearsBP
              axios.post("/afe/afes/add",afe)
                .catch(err=> console.log(err),setFailed(true))
            })
            }
          }
          // axios.post("/upload/mesureTool",{len:Images.length}).catch(err=>console.log(err));
      }
    useEffect(()=>{
      async function uploadData() {
        if(followConvention==false){
          const group = groupData(data)
          Object.keys(group).map(key=>{
            Object.keys(group[key].dataList).map(async(par)=>{
              const parInfo = group[key].dataList[par]
              const particle ={
                volc_num: volcID,
                volc_name: parInfo.volc_name,
                afe_code: afeCode,
                sample_id:1,
                id:group[key].id,
                index:par,
                instrument:"binocular",
                imgURL:parInfo.image_path,
                gsLow:parInfo.gsLow,
                gsUp: parInfo.gsUp,
                multi_focus: false,
                magnification: parInfo.mag,
                main_type: parInfo.bComp.toLowerCase(), 
                crystallinity_and_color:parInfo.crys.toLowerCase(), 
                alteration_degree: parInfo.alteration.toLowerCase(), 
                shape:parInfo.shape.toLowerCase()
              }
              if(parInfo.jType) particle.sub_type = parInfo.jType.toLowerCase();
              if(parInfo.cType) particle.crystal_type = parInfo.cType.toLowerCase();
              if(parInfo.aType) particle.altered_material_type = parInfo.aType.toLowerCase();
              console.log(particle)
              await axios.post("/particle/add", particle)
                .catch(err=>console.log(err, particle),setFailed(true))
              })
            })
          }else if(followConvention == true){
            
            for(var i=0;i<data.length;i++){
              const particle={
                volc_num: volcID,
                volc_name: data[i].volc_name,
                afe_code: afeCode,
                sample_id:sampleList? sampleList[i].sample_id:"unknown",
                id: data[i].id,
                index: data[i].index,
                instrument:"binocular",
                imgURL:data[i].image_path,
                gsLow:data[i].gsLow,
                gsUp: data[i].gsUp,
                multi_focus: data[i].multi_focus,
                magnification: data[i].mag,
                main_type: data[i].mType.toLowerCase(), 
              }
              if(data[i].crys) particle.crystallinity = data[i].crys.toLowerCase();
              if(data[i].color) particle.color = data[i].color.toLowerCase();
              if(data[i].hydro_alter_degree) particle.hydro_alter_degree = data[i].hydro_alter_degree.toLowerCase();
              if(data[i].shape) particle.shape = data[i].shape.toLowerCase();
              if(data[i].sType) particle.sub_type = data[i].sType.toLowerCase();
              await axios.post("/particle/add", particle)
                .catch(err=>console.log(err,particle),setFailed(true))
              if(sampleList){
                const sample={
                  volc_num: volcID,
                  afe_code: afeCode,
                  sample_id: sampleList[i].sample_id,
                }
                if(sampleDate) {sample.sample_date = sampleDate}
                if (sampleLat) {sample.sample_loc_lat = sampleLat}
                if (sampleLon) {sample.sample_loc_lon = sampleLon}
                await axios.post("/sample/add",sample)
                .catch(err=> console.log(err),setFailed(true)) 
              }
            }
          }
          if(isLoading == true) setIsLoading(false)
      }
      uploadData()
      
    },[afeCode])
    useEffect(()=>{
      if(isLoading === false ){
        changeLocation('/database/catalogue')
      }
    },[isLoading])
    return (
        <div style={{ maxWidth:"80%",margin: '2rem auto' }}>
            <Typography gutterBottom variant="h4" align="center" style={{fontWeight:"600"}} >
        Help Us Expand Our Database!
       </Typography>
      <Grid>
        <Card style={{ maxWidth: "100%", padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>

            <form>
            <div style={{padding: "20px 5px"}}>
                <FileUpload refreshFunction={updateImages}/>
            </div>
              <Grid container spacing={2}>
              <Grid xs={12} item>
                  <Typography style={{color:"red"}}>*Note: If different images have the same filename but with different index number at the end, we will assume those are come from the same particle (No index means index 0). Otherwise, we will assume every image is come from different particles. </Typography>
                  <Typography style={{color:"red"}}> Example: par1_1.jpeg, par1_2.jpeg, par1_3.jpeg, par2.jpeg</Typography>
                </Grid>
                <Grid xs={12} item>
                <Autocomplete
                  disablePortal
                  options={volcanoList}
                  value={volcName}
                  onChange={(event,newValue)=>{onVolcChange(newValue)}} 
                  renderInput={(params) => 
                  <TextField 
                    {...params} 
                    placeholder="Enter volcano name" 
                    label="Volcano Name" 
                    variant="outlined"
                    fullWidth
                    error={volcValid.error} 
                    helperText={volcValid.helperText}
                    required />}
                />
                </Grid>
                <Grid xs ={12} sm={3} item>
                  <Typography style={{fontWeight:600}}>Ash Emission Date:</Typography>
                </Grid>
                <Grid xs={12} item>
                  <DatePickerCustom 
                  dateFormat={afeFormat} 
                  onFormatChange={onAFEFormatChange} 
                  values={dateFormatValues} 
                  label="Ash Emission Date" 
                  value ={afeDate}
                  yearsBP={afeYearsBP}
                  onYearsBPChange={onAFEYearsBPChange} 
                  setValue={setAFEDate}/>
                </Grid>
                <Grid xs ={12}  item>
                  <Typography style={{fontWeight:600}}>Eruption:</Typography>
                </Grid>
                <Grid xs ={12}  item>
                  <TextField 
                      readOnly={volcName && afeDate}
                      label="Nearest Eruptions"
                      onChange ={(newValue)=>{
                        let value = newValue.target.value
                        if(value == "Unknown"){
                          setEd(null)
                          setEStart({...eStartDate,date:null})
                          setEEnd({...eEndDate,date:null})
                          setAddable(false)
                        }else if (value.ed_code){
                          if(afeFormat !="Years BP"){
                            setEd(value)
                            if(value.ed_stime){
                              setEStart({...eStartDate,date:value.ed_stime.toString().slice(0,10)})
                            }
                            if(value.ed_etime){
                              setEEnd({...eEndDate,date:value.ed_etime.toString().slice(0,10)})
                            }
                            setAddable(false)
                          }
                          else{
                            setEd(value)
                            setEStart({...eStartDate,date:null})
                            setEEnd({...eEndDate,date:null})
                            setAddable(false)
                          }
                        }else{
                          setEd(null)
                          setEStart({...eStartDate,date:null})
                          setEEnd({...eEndDate,date:null})
                          setAddable(true)
                        }
                      }} 
                      variant="outlined"
                      value = {eruption}
                      select
                      fullWidth 
                      required >
                          {eruptionList.map(e => (
                          e.ed_code ? afeFormat!="Years BP"?
                          <MenuItem key = {e.ed_code} value={e}><span style={{fontWeight:600}}>Eruption Code: </span> &ensp; {e.ed_code} &ensp; <span style={{fontWeight:600}}>-&ensp;Start: </span> &ensp; {e.ed_stime?e.ed_stime.toString().slice(0,10):"Unknown"} &ensp; <span style={{fontWeight:600}}> -&ensp;End: </span> &ensp; {e.ed_etime?e.ed_etime.toString().slice(0,10):"Unknown"} </MenuItem>
                          :<MenuItem key = {e.ed_code} value={e}><span style={{fontWeight:600}}>Eruption Code: </span> &ensp; {e.ed_code} &ensp; <span style={{fontWeight:600}}>-&ensp;Years BP: </span> &ensp; {e.ed_yearsBP?e.ed_yearsBP:"Unknown"}</MenuItem>:<MenuItem key = {e} value ={e} style={{fontWeight:600}}>{e}</MenuItem>
                          ))}
                  </TextField>
                </Grid>
                <Grid xs={12} sm={6} item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Eruption Start Date"
                    value={eStartDate.date}
                    onChange={(newValue)=>{
                      setEStart({...eStartDate,date:newValue.toISOString().slice(0,10)}) //change format date
                    }}
                    readOnly={!addable}
                    renderInput={(params) => 
                    <TextField
                      {...params}
                      error={eStartValid.error}
                      variant="outlined" 
                      InputLabelProps={{
                        shrink: true
                      }}
                      helperText={!eStartDate.date?
                        (<div>
                          <p style={{display:"inline",color:"red"}}>{eStartDate.helperText}.</p>
                          {eStartDate.helperText?<p style={{display:"inline",color:"#0291c9",cursor:"pointer",textDecoration:"underline"}} onClick={()=>setAddable(true)}> Add a new Eruption</p>:null}
                        </div>):eStartValid.helperText}
                      fullWidth />}
                  />
                </LocalizationProvider>
                </Grid>
                <Grid xs={12} sm={6} item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Eruption End Date" 
                    value={eEndDate.date}
                    onChange={(newValue)=>{
                      setEEnd({...eEndDate,date:newValue.toISOString().slice(0,10)}) //change format date
                    }}
                    readOnly={!addable}
                    renderInput={(params) => 
                    <TextField
                      {...params}
                      error={eEndValid.error}
                      variant="outlined" 
                      InputLabelProps={{
                        shrink: true
                      }}
                      helperText={eEndValid.helperText}
                      fullWidth />}
                  />
                </LocalizationProvider>
                </Grid>
                <Grid xs ={12}  item>
                  <Typography style={{fontWeight:600}}>Sample infomation:</Typography>
                </Grid>
                <Grid xs={12} item>
                  <DatePickerCustom 
                  dateFormat={sampleFormat} 
                  onFormatChange={onSampleFormatChange} 
                  values={dateFormatValues} 
                  label="Sample Collection Date" 
                  value ={sampleDate}
                  yearsBP={sampleYearsBP}
                  onYearsBPChange={onSampleYearsBPChange} 
                  setValue={setSampleDate} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        placeholder="Enter number from 0 to 90" 
                        label="Collection Location Longitude" 
                        variant="outlined" 
                        type="number"
                        value={sampleLon}
                        onChange={onSampleLonChange}
                        fullWidth>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        placeholder="Enter number from 0 to 90" 
                        label="Collection Location Latitude" 
                        variant="outlined" 
                        type="number"
                        value={sampleLat}
                        onChange={onSampleLatChange}
                        InputProps={{
                          inputProps: { 
                              max: 90, min: 0 
                          }
                        }}
                        fullWidth>
                    </TextField>
                </Grid>
                <Grid xs ={12}  item>
                  <Typography style={{fontWeight:600}}>Image infomation:</Typography>
                  <Typography style={{color:"#8f8f8f"}} >Tips: If you name your images following our naming convention. Our system will automatically get data from your filename.</Typography>
                </Grid>
                <Grid item xs={4} >
                    <TextField 
                        label="Follow our Naming Convention" 
                        variant="outlined" 
                        select
                        value={followConvention}
                        onChange={onFollowChange}
                        error={followValid.error} 
                        helperText={followValid.helperText}
                        fullWidth 
                        required >
                            {Object.keys(booleanList).map(key => (
                            <MenuItem key = {key} value={booleanList[key]}>{key} </MenuItem>
                            ))}
                        </TextField>
                </Grid>
                <Grid item xs={8}/>
                {followConvention==false?
                (<Grid container xs={12} spacing={2} style={{paddingLeft:7}}><Grid item xs={12} sm={4}>
                    <TextField 
                        placeholder="Enter number only" 
                        label="Magnification" 
                        variant="outlined" 
                        type="number"
                        value={magnification}
                        onChange={onMgChange}
                        error={magValid.error} 
                        helperText={magValid.helperText}
                        fullWidth 
                        required >
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField 
                        label="Grain Size Lower Bound" 
                        variant="outlined" 
                        select
                        value={gsLow}
                        onChange={onGsLowChange}
                        fullWidth
                        error={gsLowValid.error} 
                        helperText={gsLowValid.error?gsLowValid.helperText:"Please ensure Upper Bound is greater than or equal to Lower Bound"}
                        required >
                            {gsValue.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                        </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField 
                        label="Grain Size Upper Bound" 
                        variant="outlined" 
                        select
                        value={gsUp}
                        onChange={onGsUpChange}
                        error={gsUpValid.error} 
                        helperText={gsUpValid.helperText}
                        fullWidth 
                        required >
                            {gsValue.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} >
                    <Typography style={{fontWeight:600}}> Tell us more about your data (optional):</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label="Basic Component" 
                        variant="outlined" 
                        select
                        value={bComp}
                        onChange={onBCompChange}
                        fullWidth 
                        optional >
                            {bComps.map(item => (
                           <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                {bComp == "Free Crystal"?
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label="Crystal Type" 
                        variant="outlined" 
                        select
                        value={cType}
                        onChange={onCTypeChange}
                        fullWidth 
                        optional >
                            {cTypes.map(item => (
                           <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                :bComp == "Altered Material"?
                <Grid item xs={12} sm={6}>
                  <TextField 
                      label="Altered Material Type" 
                      variant="outlined" 
                      select
                      value={aType}
                      onChange={onATypeChange}
                      fullWidth 
                      optional >
                          {aTypes.map(item => (
                        <MenuItem key = {item} value={item}>{item} </MenuItem>
                          ))}
                  </TextField>
                </Grid>
                :bComp == "Juvenile"?
                <Grid item xs={12} sm={6}>
                  <TextField 
                      label="Juvenile Type" 
                      variant="outlined" 
                      select
                      value={jType}
                      onChange={onJTypeChange}
                      fullWidth 
                      optional >
                          {jTypes.map(item => (
                        <MenuItem key = {item} value={item}>{item} </MenuItem>
                          ))}
                  </TextField>
                </Grid>:<Grid item xs ={12} sm={6}> </Grid>}
                <Grid item xs={12} sm={4}>
                <TextField 
                        label="Shape" 
                        variant="outlined" 
                        select
                        value={shape}
                        onChange={onShapeChange}
                        fullWidth 
                        optional >
                            {shapes.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField 
                        label="Crystallinity and Color" 
                        variant="outlined" 
                        select
                        value={crys}
                        onChange={onCrysChange}
                        fullWidth 
                        optional >
                            {crystallinity.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField 
                        label="Alteration Degree" 
                        variant="outlined" 
                        select
                        value={alteration}
                        onChange={onAltChange}
                        fullWidth 
                        optional >
                            {alterations.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid></Grid>):null}
                <Grid item xs={12} >
                    <Typography style={{color:"#7d7d7d"}}> * means required</Typography>
                </Grid>
              </Grid>
            </form>
            {buttonClicked?<div>
                <Button
                        className={classes.tableButton}
                        variant="contained" 
                        color="success"
                        onClick={()=>{handleTableClick()}}
                        style={{marginBottom:"10px"}}
                >
                    Refresh Table
                </Button>
                    <Table data={data} setData={setData}/>
                    </div>:
                    <div>                
                    <Button
                        className={classes.tableButton}
                        variant="contained" 
                        color="success"
                        onClick={()=>{handleTableClick()}}
                        style={{marginBottom:"10px"}}
                >
                    Show in Table
                </Button></div>}
                <div className={classes.submitandLoading}>
                  {isLoading?<CircularProgress className={classes.loading} />:null}
                <Button
                  className={classes.submitButton}
                  variant="contained" 
                  onClick={onSubmit}
                  >
                  Submit
              </Button>
              </div>

                
          </CardContent>
        </Card>
      </Grid>
        </div>
    )
}

export default ContributePage
