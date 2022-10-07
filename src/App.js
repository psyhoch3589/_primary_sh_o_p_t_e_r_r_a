import './App.css';
import React from 'react';
import axios from 'axios';




function App() {
  const [url,setUrl]=React.useState("192.168.101.36");
  const [DataItem,setDataPost]=React.useState();
  const [test,setTest]=React.useState(0);
  const [articleID,SetArticleID]=React.useState();
  const [selected,setSelected]=React.useState(true);
  const [option, setOption]= React.useState("article");
  // forms of Add articles
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [cost, setCost] = React.useState();
  const [discount,setDiscount]=React.useState();
  const [stock,setStock]=React.useState();
  const [orders,setOrders]=React.useState();

  const [AddItemFormdisplay, setAddItemFormdisplay] = React.useState('true');
  const [selectedImage, setSelectedImage] = React.useState(null);

  // test
  const [file,setFile]= React.useState();
  const [TestPublishText,setTestPublishText]=React.useState(0);

  // methodes to handle input
  const handleChangetitle = event => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };
  const handleChangeCost = event => {
    setCost(event.target.value);
  };
  const handleChangeDiscount = event => {
    setDiscount(event.target.value);
  };
  const handleChangeStock = event => {
    setStock(event.target.value);
  };
  const handleChangeOrders = event => {
    setOrders(event.target.value);
  };


  React.useEffect(()=>{
    fetchDataItem()
  },[]);
  const fetchDataItem = ()=>{
    const data={
      key:0
    }
    fetch('http://'+url+'/Shopterra/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data[0].id){
        setDataPost(data)
        setTest(1)}
        else setTest(0);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const publish =()=>{
    let test=0;
    const data = {
      title : title,
      description: description,
      cost : cost,
      Discount:discount,
      Stock:stock,
      orders:orders,
      status : 'online',
      key:'1'
    };
    fetch('http://'+url+'/Shopterra/Api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {if(data.status=='ok') {
        test=1;
      }})

    // upload image
    const formData =  new FormData();
    formData.append('image', file);
    formData.append('index', 'shopterraClient');
    axios.post('http://'+url+'/Shopterra/imageUpload.php', formData, {
    })
    .then(res => {
      if(test==1 && res.status==200){
        console.log("ok")
        setTitle('')
        setDescription('')
        setCost('')
        setDiscount('')
        setStock('')
      }
      })
  }
  return (
    
    <div className='row nopadding Main'>
      <div className='col-xl-3 col-lg-3 col-md-3 left_section nopadding'>
        <h1 className='logo'>test<span className='logo_point'>.</span></h1>
        <div className='Options'>
          <button className={selected=='Overview' ? 'Btn_Option selectedOption':'Btn_Option'}>Overview</button><br/>
          <button className={selected=='article' ? 'Btn_Option selectedOption':'Btn_Option'} onClick={()=>{
            setSelected('article')
            setOption('article')
            // window.location.reload()
            }}>Articles</button><br/>
          <button className={selected=='mobileApp' ? 'Btn_Option selectedOption':'Btn_Option'} onClick={()=>{
            setSelected('mobileApp')
            setOption('mobileApp')}
            }>Mobile App</button><br/>
          <button className={selected=='sells' ? 'Btn_Option selectedOption':'Btn_Option'}>Sells</button><br/>
          <button className={selected=='teamapp' ? 'Btn_Option selectedOption':'Btn_Option'}>Team App</button><br/>
          <button className={selected=='gain' ? 'Btn_Option selectedOption':'Btn_Option'}>Gain</button>
        </div>
      </div>
      <div className='col-xl-9 col-lg-9 col-md-9 nopadding'>

        {/* mobile app */}
        {option=='mobileApp' ? <><div className='iphone'></div>
          <div className='circle'></div>
          <div className='camera'></div>
          <div className='speaker'></div>
          <div className='screen'>
            <input placeholder='search an item'/>
            <div className='shareBackground'>
            </div>
          </div>
          <div className='home1'></div>
          <div className='home2'></div>
          <div className='highlight'></div>
          <div className='line'></div></>:false}

          {/* table of articles */}
          {option=='article' ?<>
          <h1 id='title_article'>Vos articles</h1>
          <table className='content-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>title</th>
                <th>description</th>
                <th>cost</th>
                <th>online</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {test==1 ? DataItem.map((item,index)=>{
              return( 
                <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.cost}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={()=>{
                    setOption("Modify")
                    SetArticleID(item.id);
                    }}>Modify</button>
                  <button onClick={()=>{
                    fetchDataItem()
                    window.location.reload()}}>Publish</button>
                </td>
              </tr>
              )}):false}
            </tbody>
          </table></>:false}

          {/* Add new article */}
          {(option=='addItem' || option=='Modify') ?
          (<div className='FormContainer'>
            {option=='addItem'? (<h1>New Article</h1>):(<h1>Modify the article</h1>)}
            <div className="input-bx">
              <input type="text" value={title} onChange={handleChangetitle} required="required" />
              <span>title</span>
            </div>
            <div className="input-bx">
                <textarea type="text" value={description} onChange={handleChangeDescription} required="required" />
                <span>description</span>
            </div>
            <div className='Stock_Statistics'>
              <div className="input-bx" id='cost'>
                  <input type="text" value={orders} onChange={handleChangeOrders} required="required" />
                  <span>Orders</span>
              </div>
              <div className="input-bx" id='test'>
                  <input type="text" value={discount} onChange={handleChangeDiscount} required="required" />
                  <span>Discount</span>
              </div>
              <div className="input-bx">
                  <input type="text" value={stock} onChange={handleChangeStock} required="required" />
                  <span>Stock</span>
              </div>
            </div>
            <div className="input-bx" id='cost'>
                  <input type="text" value={cost} onChange={handleChangeCost} required="required" />
                  <span>Cost</span>
                  <h4 id='currency'>$</h4>
              </div>
            <div>
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
              id="BtnUploadFile"
            />
          </div>
            <button className='submit_item' onClick={()=>publish()}>Submit</button>
          </div>):false}
          {/* floatting button */}
          {option=='article' ?(<button className='float' onClick={()=>setOption('addItem')}>
            <img src="" />
          </button>):false}
        </div>
    </div>
  );
}

export default App;
