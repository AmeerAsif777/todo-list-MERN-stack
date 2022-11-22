import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import Lottie from 'react-lottie';
import DefaultPhoto from '../../images/logo.png';
import loader from '../../images/loader.json';

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const GetForm = () => {
    const [posts, setPosts] = useState([])
    const [del, setDel] = useState({})
    const [searchKeyword, setSearchKeyword] = useState('');
    const [resultList, setResultList] = useState();
    const [loader, setLoader] = useState(false);
    const deletePost = async(id)=>{
        let response = await fetch(`http://localhost:8000/delete/${id}`,{
            method:'DELETE'
        })
        const data = await response.json()
        setDel(data)
        setLoader(false);
    }

    const deleteConfirmed = (userId)=>{
        let ans = window.confirm("Are you sure you want to delete")
        setLoader(true);
        if(ans){
            deletePost(userId)
        }
    }
    const searchItems = e =>
    {
        const searchWord = e.target.value;
        console.log("SEARCHING WORD", searchWord);
        setSearchKeyword(searchWord);
        if (searchWord.length === 0) {
            setResultList(posts);
        }
        else {
            const searchedList = posts.filter(item =>
                item.name.toLowerCase().includes(searchWord),
            );
            console.log("fuckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", searchedList );
            setResultList(searchedList);
        }    
    }
    useEffect(() => {
        const getData = async () => {
            try {
                console.log('Client side is coming..................');
                setLoader(true);
                const ownerID = JSON.parse(localStorage.getItem('profile')).result._id;
                const res = await fetch(`http://localhost:8000/get/${ownerID}`, {
                    method: 'GET',
                })
                const data = await res.json();
                console.log('FUCK IT YAAR', data);
                setPosts(data)
                setResultList(data);
                setLoader(false);
            }
            catch (err) {
                console.log('ERROR BABE', err)
            }
        }
        return getData;
    }, [del._id])


    return (
        <div>
          <input
            type=" text "
            value={searchKeyword}
            placeholder={`Search Photos`}
            onChange={searchItems}
          />
          <Link to={`/create`}  className='btn btn-warning' style={{marginLeft:'28px'}}>Upload</Link>
            <h2 className='mt-5 mb-5'>Recent Form</h2>
            <div className='row' style={{ display: 'flex', flexWrap: 'wrap' }} >
                {loader || !resultList ?       <Lottie options={defaultOptions}
              height={400}
              width={400}
/> :
                    resultList.map((post) => {
                        let photoUrl = post.photo ? `http://localhost:8000/photo/${post._id}?${new Date().getTime()}` : DefaultPhoto

                        return <div className='col-lg-4' key={post._id} style={{textAlign: 'center', margin: '20px'}}>
                            <MDBCard>
                                <MDBCardImage
                                    src={photoUrl}
                                    alt={post.name}
                                    style={{ height: "300px", width: "300px", objectFit: "cover" }}
                                />
                                <MDBCardBody>
                                    <MDBCardTitle>{post.name}</MDBCardTitle>
                                    {/*<MDBCardText>
                                        {post.email}
                                    </MDBCardText>
                    */}
                                    <Link to={`edit/${post._id}`} state={{ ...post }}
                                        className='btn btn-warning'
                                    >Edit</Link>
                                    <MDBBtn
                                        style={{border: '1px solid',
                                            borderRadius: '10px',
                                            width: '60px',
                                            marginLeft: '10px'}}
                                        className='btn btn-danger ms-3'
                                        onClick={()=>deleteConfirmed(post._id)}
                                    >
                                        Delete
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    })

                }

            </div>

        </div>
    )
}

export default GetForm