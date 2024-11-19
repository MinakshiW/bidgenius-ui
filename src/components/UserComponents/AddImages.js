import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const AddImages = () => {

  const { register, handleSubmit, reset } = useForm()
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  
 
  async function saveData(data) {
    console.log(data)
    const formData = new FormData();


    if (!data.product_image.length) {
      setError('Please select at least one image.')
      return;
    }

    
    for (let i = 0; i < data.product_image.length; i++) {
      if (data.product_image[i].size > 2 * 1024 * 1024) {
        setError(`Image "${data.product_image[i].name}" is larger than 2MB.`);
        return;
      }
      formData.append('uploaded_images', data.product_image[i]);
    }

    
    formData.append('product', data.product);

    try {
      const res = await axios.post('http://127.0.0.1:8000/prodImage/', formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      })
      console.log(res)
      if (res.status === 201) {
        console.log('Data saved', res)
        alert("Images added successfully")
        reset()
        setError('')
      }
    } catch (e) {
      console.log(e)
      alert('Something went wrong while uploading images.')
    }
  }

  return (
    <div id="intro" className="bg-image bgimageuser vh-100 mask m-5">
      <div className='content' style={{ width: '40%', background: 'rgb(224,224,224)' }}>
        <h1>Add Images</h1>

        <form onSubmit={handleSubmit(saveData)}>
          <div className='col-mb-4'>
            <label className='form-label'>Product Image</label>
            <input 
              type="file" 
              name="product_images" 
              className='form-control m-2' 
              multiple 
              {...register('product_image')} 
              onChange={(e) => setFiles(e.target.files)} 
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>} 

          <div className='col-mb-4'>
            <label className='form-label'>Product</label>
            <input 
              type="text" 
              className='form-control m-2' 
              {...register('product', { required: true })} 
            />
          </div>

          <button className="btn btn-outline-success" type="submit">Upload</button>
        </form>
      </div>
    </div>
  )
}

export default AddImages;
