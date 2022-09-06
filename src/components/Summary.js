import {React , useState,useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate,useLocation} from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../home.css'

function Summary()
{

    let BookedDetails = useLocation().state
    let navigate = useNavigate();

    return (
        
        <div className="card w-75 m-4" >
            <p className="card-header h3">Book Tickets</p>
            <div className="body">
                <div className="form">
                    
                    <div>
                        <div style={{display:'flex'}}>
                            <label className='px-3'> Subtotal : </label>
                            <p> Rs.{BookedDetails.subtotal} </p>
                        </div>
                    </div>

                    <div>
                        <div style={{display:'flex'}}>
                            <label className='px-3'> Service Tax @14% : </label>
                            <p> Rs.{BookedDetails.serviceTax} </p>
                        </div>
                    </div>

                    <div>
                        <div style={{display:'flex'}}>
                            <label className='px-3'> Swachh Bharat Cess @0.5% : </label>
                            <p> Rs.{BookedDetails.swachhCess} </p>
                        </div>
                    </div>

                    <div>
                        <div style={{display:'flex'}}>
                            <label className='px-3'> Krishi Kalyan Cess @0.5% : </label>
                            <p> Rs.{BookedDetails.krishiCess} </p>
                        </div>
                    </div>

                    <div>
                        <div style={{display:'flex'}}>
                            <label className='px-3'> Total : </label>
                            <p> Rs.{BookedDetails.subtotal + BookedDetails.serviceTax + BookedDetails.swachhCess + BookedDetails.krishiCess} </p>
                        </div>
                    </div>

                    <div className="inputbox text-center">
                       
                        <Button variant="success" onClick={()=> {navigate('/Home')}}>Home</Button>{' '}
                    </div>
                </div>

               
            </div>
        </div>
       
    )
}

export default Summary