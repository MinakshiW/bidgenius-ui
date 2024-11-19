import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
    const {register,handleSubmit} = useForm()
    const [ProdCategory,setProdCategory] = useState([])
    const nav = useNavigate()


    async function updateData(data){
        console.log(data)
        
        
    }
      

  return (
    <div id="intro" className="bg-image bgimageuser vh-100 mask">
        <div className="p-3 mt-2 w-50 mx-auto p-4 ps-5 pe-5 rounded content" style={{width:'40%',background:'rgb(224,224,224)'}}>
        <h4 className="text-center mb-3">Update Product</h4>
			<form onSubmit={handleSubmit(updateData)}  class="row g-3" >
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

export default UpdateProduct