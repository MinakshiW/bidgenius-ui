import React, { useEffect, useState } from 'react'
import './AdminRegistration.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminRegistration = () => {

    const { register, handleSubmit, reset } = useForm()
    const nav = useNavigate()
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const [selectedState, setSelectedState] = useState([])
    const [selectedCountry, setSelectedCountry] = useState([])

    const addData = (data) => {
        data.aadhar_card = data.aadhar_card[0]
        data.pan_card = data.pan_card[0]
        data.passport_front = data.passport_front[0]
        data.passport_back = data.passport_back[0]
        axios.post('http://127.0.0.1:8000/admincreate/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }}
        ).then(
            (response) => {
                if (response.status === 201) {
                    reset()
                    nav('#')
                }
            }
        ).catch(
            (error) => {
                console.error(error)
            }
        )
    }

    const getCoutryData = () => {
        axios.get('http://127.0.0.1:8000/country/').then(
            (response) => {
                if (response.status === 200) {
                    setCountries(response.data)
                }
            }
        ).catch(
            (error) => {
                console.error(error)
            }
        )
    }

    const getStateData = () => {
        console.log(selectedCountry)
        if (selectedCountry) {
            axios.get(`http://127.0.0.1:8000/state/?country_id=${selectedCountry}`).then(
                (response) => {
                    if (response.status === 200) {
                        setStates(response.data)
                    }
                }
            ).catch(
                (error) => {
                    console.error(error)
                }
            )
        } else {
            setStates([])
        }

    }

    const getCityData = () => {

        if (selectedState) {
            axios.get(`http://127.0.0.1:8000/city/?state_id=${selectedState}`).then(
                (response) => {
                    if (response.status === 200) {
                        setCities(response.data)
                    }
                }
            ).catch(
                (error) => {
                    console.error(error)
                }
            )
        } else {
            setCities([])
        }

    }

    useEffect(() => {
        getCoutryData()
    }, [])

    useEffect(() => {
        getStateData()
    }, [selectedCountry])

    useEffect(() => {
        getCityData()
    }, [selectedState])


    return (
        <div className="bg-image bgimageadmin vh-100 mask ">


            <div className="content">
                <header>Create Account</header>
                <form onSubmit={handleSubmit(addData)} encType='multipart/form-data'>

                    <div className="row justify-content-center mb-3">
                        <div className="field col-md-5 me-4">
                            <input type="text" required placeholder="First Name *" {...register('first_name')} />
                        </div>
                        <div className=" field col-md-5  ">
                            <input type="text" required placeholder="Last Name *" {...register('last_name')} />
                        </div>
                    </div>

                    <div className="row justify-content-center mb-3">
                        <div className="field col-md-5 me-4">
                            <input type="email" required placeholder="Email *" {...register('email')} />
                        </div>
                        <div className=" field col-md-5 ">
                            <input type="tel" required placeholder="Contact No. *" {...register('contact_no')} />
                        </div>
                    </div>


                    <div className="row justify-content-center mb-3">
                        <div className='col-md-5 me-4'>
                            <select className="field col-12" aria-label="Default select example"
                                onChange={(e) => { setSelectedCountry(e.target.value) }
                                }
                                value={selectedCountry || ''} >
                                <option value=''>Country</option>
                                {
                                    countries.map((country, index) => {
                                        return (
                                            <option key={country.country_id} value={country.country_id}>
                                                {country.country_name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='col-md-5'>
                            <select className="field col-12" aria-label="Default select example"
                                onChange={(e) => {
                                    setSelectedState(e.target.value)
                                }}
                                value={selectedState || ''}>
                                <option value="">State</option>
                                {
                                    states.map((state, index) => {
                                        return (
                                            <option key={state.state_id} value={state.state_id}>
                                                {state.state_name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="row justify-content-center mb-3">
                        <div className='col-md-5 me-4'>
                            <select className="field col-12" aria-label="Default select example"
                                {...register('city')} defaultValue="">
                                    
                                <option value=''>City</option>
                                {
                                    cities.map((city, index) => {
                                        return (
                                            <option key={city.city_id} value={city.city_id}>
                                                {city.city_name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className=" field col-md-5  ">
                            <input type="text" required placeholder="Pincode *" {...register('pincode')} />
                        </div>
                    </div>


                    <div className="row justify-content-center mb-3">
                        <textarea required placeholder="Address *" {...register('address')}
                            className='address1' >
                        </textarea>
                    </div>

                    <div className='textalign1 ps-3'>
                        <div className="mb-3">
                            <label className='text-dark d-inline me-3'>Aadhar Card Image: * </label>
                            <input type="file" required placeholder="Aadhar Card"
                                name='aadharimage'
                                accept='image/*'
                                className='text-light-emphasis'
                                {...register('aadhar_card')} />
                        </div>

                        <div className=" mb-3 ">
                            <label className='text-dark d-inline me-3 '>Pancard Image: </label>
                            <input type="file" placeholder="Pan Card"
                                name='panimage'
                                accept='image/*'
                                className='text-light-emphasis'
                                {...register('pan_card')} />
                        </div>


                        <div className="mb-3">
                            <label className='text-dark d-inline me-3'>Passport Front Image: </label>
                            <input type="file" placeholder="Passport Front Image"
                                name='passport_front_image'
                                accept='image/*'
                                className='text-light-emphasis'
                                {...register('passport_front')} />
                        </div>
                        <div className="">
                            <label className='text-dark d-inline me-3'>Passport Back Image: </label>
                            <input type="file" placeholder="Passport Back Image"
                                name='passport_back_image'
                                accept='image/*'
                                className='text-light-emphasis'
                                {...register('passport_back')} />
                        </div>
                    </div>



                    <div className="mb-3 mt-3">
                        <input type="submit" value="Register" className='p-2 col-6 mt-3' />
                    </div>
                </form>
            </div >


        </div >
    )
}

export default AdminRegistration