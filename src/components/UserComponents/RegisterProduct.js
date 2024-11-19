import React, { useState,useEffect } from 'react'
import './RegisterProduct.css'
import {useForm} from 'react-hook-form' 
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const RegisterProduct = () => {

  const {register,handleSubmit,reset} = useForm()
  const [ProdCategory,setProdCategory] = useState([])
  const nav = useNavigate()

  async function saveData(data){
	console.log(data)
	
	try {
		const res = await axios.post('http://127.0.0.1:8000/product/',data)
		if( res.status == 201 ){
			console.log('data saved',res)
			alert("Data Added")
			reset()
			nav('/user/prod_images/')
		}
	} catch(e) {
		console.log(e);
		alert('Something went wrong..!')
	}
}
  
 

  async function getProdCategory(data) 
  {
   try{
        const res = await axios.get('http://127.0.0.1:8000/prodCategory/')
        if( res.status == 200 ){
          setProdCategory(res.data)
          }
      }
   catch(e){
			  console.log(e)
			  alert("Something went wrong.!")
		      }
  }

  useEffect( ()=>{ getProdCategory() } , [] )
  return (

  <div id="intro" className="bg-image bgimageuser vh-100 mask" >
     <div className="p-3 mt-2 w-50 mx-auto p-4 ps-5 pe-5 rounded content" style={{width:'40%',background:'rgb(224,224,224)'}}>	
			<h4 className="text-center mb-3">Product Form</h4>
			<form onSubmit={handleSubmit(saveData)}  class="row g-3" >
			  <div class="col-md-8">
			    <label for="inputTaskName" class="form-label">Product Name</label>
			    <input type="text" class="form-control" {...register('product_name')} id="inputTaskName"/>
			  </div>

			  <div class="col-md-4">
			    <label for="product_category_name" class="form-label">Product Category</label>
			    <select class="form-select" {...register('product_category_name')} id="product_category_name" >
			    	<option value={``}> click to select.. </option>   
			    	{
			    		ProdCategory.map( e =>
								<option value={e.id}> {e.product_category_name} </option>

			    		)
			    	}
			    </select>
			  </div>
			  
			  <div class="col-md-12">
			    <label for="inputDescription" class="form-label">Product description</label>
			    <textarea class="form-control" {...register('product_description')} id="inputDescription"></textarea>
			  </div>

			  <div class="col-md-6">
			    <label for="product_manufacture_year" class="form-label">Product manufacture year</label>
			    <input type="text" class="form-control" {...register('product_manufacture_year')} id="product_manufacture_year" />
			  </div>

        <div class="col-md-6">
			    <label for="product_base_price" class="form-label">product base price</label>
			    <input type="text" class="form-control" {...register('product_base_price')} 
				id="product_base_price"/>
			  </div>

			  <div class="col-md-4">
					<label className="form-label">Product varifed :</label>
					<select {...register('product_verify')} className="form-select mb-2">
						<option value="">--select--</option>
						<option value="true">varifed</option>
						<option value="false">non Varifed</option>
					</select>
				</div>

			
				<div class="col-md-6">
			    <label for="owner" class="form-label">owner Id</label>
			    <input type="text" class="form-control" {...register('owner')} 
				id="owner"/>
			  </div>

			  <div class="col-12">  
			    <button type="submit" class="btn btn-outline-success">Submit</button>
			  </div>
			</form>

		</div>
  </div>
  )
}

export default RegisterProduct