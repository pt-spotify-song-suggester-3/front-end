// import React, { useState, useEffect } from "react";
// import { Container, Jumbotron, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
// import SongCard from "./SongCard";
// import axios from "axios";
// import './Searchbar.css'
// import {connect} from 'react-redux'


// function Searchbar(){

//     const [query, setQuery] = useState({
//         artistName: '',
//         songName: ''
//     })

//     const [results, setResults] = useState([]);

//     const clickHandler = (id)=>{
// 		setUrl("https://api.spotify.com/v1/recommendations?seed_tracks=" + id);
// 	};

//     const changeHandler = event => {
//         setQuery({
//             ...query,
//             [event.target.name]: event.target.value
//         })
//     }

// 	const submitHandler = (event) => {
// 		event.preventDefault();

// 	};
// //spotify api logic
//     const clientId = "ff48ca622ed54e64810d10967a33b4ba"
//     const clientSecret = "e15cd38ce23c4abf988215663194bfad"
// 	const options = {
// 		headers: {
// 			"Content-Type" : "application/x-www-form-urlencoded",
// 			"Authorization": "Basic " + btoa(clientId + ":" + clientSecret) //sets the id and secret to 64 bit encoded string as per documentation
// 		} 
// 	};
//     const body = "grant_type=client_credentials";

//     const [url, setUrl] = useState("https://api.spotify.com/v1/search?q=" + query.artistName.split(" ").join("+") + "+" + query.songName.split(" ").join("+") + "&type=track");
//     const [offset, setOffset] = useState(0);

//     useEffect(() => {
// 		setUrl("https://api.spotify.com/v1/search?q=" + query.artistName.split(" ").join("+") + "+" + query.songName.split(" ").join("+") + "&type=track");
// 	}, [query]);

//     useEffect(() => {
//         axios.post('https://accounts.spotify.com/api/token', body, options)
//         .then(res => {
//             console.log("Success",res)
//             const token = res.data.access_token;
//             const option = {
//                 headers: {
//                     "Authorization": "Bearer" + token
//                 }
//             }
//             axios.get(url + "&offset=" + offset, option)
//             .then(res => {
//                 console.log("Get successful", res)
//                 if(res.data.tracks.items){ //tried to set url state as an object, one with a key for the actual url, and another key to control which part of the
//                     //object to push onto results. However, compiler didn't like that res wasn't defined so settled with this solution.
//                 setResults(res.data.tracks.items);
//                 }else{
//                 setResults(res.data.tracks); //after finally making it all work, recommendation uri doesn't support pagination. Mostly keeping for posterity.
//                 }  
//             })
//             .catch(error => {
//                 console.log("Get ERROR", error)
//             })

//         })
//         .catch(error => {
//             console.log("Error with get request", error)
//         })
//     },[url, offset])

// 	//end of spotify api logic
// 	return(
//             <Container>
//                 <Jumbotron>
//                     <h1>Search</h1>
//                     <Form onSubmit={submitHandler}>
//                         <FormGroup>
//                             <Label hidden>Artist Name</Label>
//                             <Input type="text" name="artistName" id="artistName" value={query.artistName} onChange={changeHandler} placeholder="Artist Name" />
//                         </FormGroup>
//                         <FormGroup>
//                             <Label hidden>Song Name</Label>
//                             <Input type="text" name="songName" id="songName" value={query.songName} onChange={changeHandler} placeholder="Song Name" />
//                         </FormGroup>
//                         <Button type="submit">Submit</Button>
//                     </Form>
//                 </Jumbotron>
//     ​
//     ​
//                 {/*result functionality*/}
//                 <Row>
//                     {results.map(result => (
//                         <Col md="6" key={result.id} onClick={() => clickHandler(result.id)}>
//                             <SongCard result={result} />
//                         </Col>
//                     ))}
//                 </Row> 
//                 <Button onClick={()=>{setOffset(offset-20)}}>Previous</Button>
//                 <Button onClick={()=>{setOffset(offset+20)}}>Next</Button>
            
//             </Container>
//     )
// }
// const mapStateToProps = state => {
//     return {
//         results: state.results
//     }
// }
// export default connect (
//     mapStateToProps
// ) (Searchbar);

//artist then song title	
import React, { useState, useEffect } from "react";
import { Container, Jumbotron, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import SongCard from "./SongCard";
import axios from "axios";
function SearchBar(){
	const [query, setQuery] = useState({
		artistName: "",
		songName: ""
	});
	const [results, setResults] = useState([]);
	const [offset, setOffset] = useState(0);
	const changeHandler= (event) => {
		setQuery({
			...query,
			[event.target.name]: event.target.value
		});
	};
	const submitHandler = (event) => {
		event.preventDefault();
		setQuery({
			artistName: "",
			songName: ""
		});
	};
//spotify api logic
    const clientId = "ff48ca622ed54e64810d10967a33b4ba"
    const clientSecret = "e15cd38ce23c4abf988215663194bfad"
	const options = {
		headers: {
			"Content-Type" : "application/x-www-form-urlencoded",
			"Authorization": "Basic " + btoa(clientId + ":" + clientSecret) //sets the id and secret to 64 bit encoded string as per documentation
		} 
	};
	const body = "grant_type=client_credentials";
	// useEffect(() => {
	// 	axios.post("https://accounts.spotify.com/api/token", body, options).then(res => { //renews authorization token every new request since token lasts 3.6s
	// 		const token = res.data.access_token; //saves auth token for use in the header for future api calls
	// 		const options = {
	// 			headers: {
	// 				"Authorization": "Bearer " + token
	// 			}
	// 		};
	// 		const nameQuery = query.artistName.split(" ").join("+"); //refactors query strings to be interpreted by api
	// 		const songQuery = query.songName.split(" ").join("+");
	// 		axios.get("https://api.spotify.com/v1/search?q=" + nameQuery + "+" + songQuery + "&type=track&offset=" + offset , options).then(res => {		
	// 			console.log(res.data.tracks.items);
	// 			setResults(res.data.tracks.items);
	// 		});
	// 	});
	// }, [query, offset]);
	const clickHandler = (id)=>{
		// axios.post("https://accounts.spotify.com/api/token", body, options).then(res => { //renews authorization token every new request since token lasts 3.6s
		// 	const token = res.data.access_token;
		// 	const options = {
		// 		headers: {
		// 			"Authorization": "Bearer " + token
		// 		}
		// 	};
		// 	axios.get("https://api.spotify.com/v1/recommendations?seed_tracks=" + id + "&offset=" + offset, options).then(res => {
		// 		console.log(res.data.tracks);
		// 		setResults(res.data.tracks);
		// 	});
		// });
		/*====================================================================*/
		setUrl("https://api.spotify.com/v1/recommendations?seed_tracks=" + id);
		// setQuery({
		// 	artistName: "", //this actually broke pagination logic. When you would load recommendations it would change the query, thus reset the url state to search.
		// 	songName: ""
		// });
	};
	//combine axios calls in order for one url state to control data flow
	const [url, setUrl] = useState("https://api.spotify.com/v1/search?q=" + query.artistName.split(" ").join("+") + "+" + query.songName.split(" ").join("+") + "&type=track");
	useEffect(() => {
		setUrl("https://api.spotify.com/v1/search?q=" + query.artistName.split(" ").join("+") + "+" + query.songName.split(" ").join("+") + "&type=track");
	}, [query]);
	useEffect(() => {
		axios.post("https://accounts.spotify.com/api/token", body, options).then(res => {
			console.log(res.data);
			const token = res.data.access_token;
			const options = {
				headers: {
					"Authorization": "Bearer " + token
				}
			}
			axios.get(url + "&offset=" + offset, options).then(res => {
				console.log(res.data.tracks.items);
				
				if(res.data.tracks.items){ //tried to set url state as an object, one with a key for the actual url, and another key to control which part of the
											//object to push onto results. However, compiler didn't like that res wasn't defined so settled with this solution.
					setResults(res.data.tracks.items);
				}else{
					setResults(res.data.tracks); //after finally making it all work, recommendation uri doesn't support pagination. Mostly keeping for posterity.
				}
			})
		});
	}, [url, offset]);
	//end of spotify api logic
	return(
		<Container>
			<Jumbotron>
				<h1>Search</h1>
				<Form onSubmit={submitHandler}>
					<FormGroup>
						<Label hidden>Artist Name</Label>
						<Input type="text" name="artistName" id="artistName" value={query.artistName} onChange={changeHandler} placeholder="Artist Name" />
					</FormGroup>
					<FormGroup>
						<Label hidden>Song Name</Label>
						<Input type="text" name="songName" id="songName" value={query.songName} onChange={changeHandler} placeholder="Song Name" />
					</FormGroup>
					<Button type="submit">Submit</Button>
				</Form>
			</Jumbotron>
​
​
		{/*result functionality*/}
			<Row>
				{results.map(result => (
					<Col md="6" key={result.id} onClick={() => clickHandler(result.id)}>
						<SongCard result={result} />
					</Col>
				))}
			</Row>
			<Button onClick={()=>{setOffset(offset-20)}}>Previous</Button>
			<Button onClick={()=>{setOffset(offset+20)}}>Next</Button>
		
		</Container>
		
	);
}
export default SearchBar;
