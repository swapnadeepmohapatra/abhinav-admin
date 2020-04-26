import React, { useState } from 'react';
import { storage } from './firebase';
import { database } from 'firebase';

function App() {
	const [imageAsFile, setImageAsFile] = useState('');
	const [imageAsUrl, setImageAsUrl] = useState({
		imgUrl: '',
		name: '',
		subTitle: '',
		description: '',
		success: false,
	});

	const [loading, setLoading] = useState(false);

	const { name, subTitle, description, success } = imageAsUrl;

	const handleChange = (name) => (event) => {
		const value = event.target.value;
		setImageAsUrl({ ...imageAsUrl, [name]: value });
	};

	const handleImageAsFile = (e) => {
		const image = e.target.files[0];
		setImageAsFile((imageFile) => image);
	};

	const handleFireBaseUpload = (e) => {
		e.preventDefault();
		console.log('start of upload');
		setLoading(true);
		if (imageAsFile === '') {
			console.error(`not an image, the image file is a ${typeof imageAsFile}`);
		}
		const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
		uploadTask.on(
			'state_changed',
			(snapShot) => {
				console.log(snapShot);
			},
			(err) => {
				console.log(err);
			},
			() => {
				storage
					.ref('images')
					.child(imageAsFile.name)
					.getDownloadURL()
					.then((fireBaseUrl) => {
						console.log(fireBaseUrl);

						const dataUpld = {
							name: name,
							description: description,
							subTitle: subTitle,
							imgurl: fireBaseUrl,
							_id: Date.now(),
						};

						database().ref('/photo').push().set(dataUpld);
						setLoading(false);
						setImageAsUrl((prevObject) => ({ ...prevObject, imgUrl: fireBaseUrl, success: true }));
					});
			}
		);
	};

	const successMessage = () => {
		return (
			<div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
				Image added successfully
			</div>
		);
	};

	const loadingMessage = () => {
		return loading && <div className="alert alert-info loading">Loading</div>;
	};

	return (
		<div className="container bg-info p-4 text-left">
			<div className="row bg-light rounded">
				<div className="col-md-8 offset-md-2" style={{ padding: 100 }}>
					{successMessage()}
					{loadingMessage()}
					<form>
						<div className="form-group">
							<label className="btn btn-block btn-success">
								<input
									type="file"
									onChange={handleImageAsFile}
									accept="image"
									placeholder="choose a photo"
								/>
							</label>
						</div>
						<div className="form-group">
							<input
								onChange={handleChange('name')}
								name="photo"
								className="form-control"
								placeholder="Name"
								value={name}
							/>
						</div>
						<div className="form-group">
							<textarea
								onChange={handleChange('subTitle')}
								name="photo"
								className="form-control"
								placeholder="Sub Title"
								value={subTitle}
							/>
						</div>
						<div className="form-group">
							<textarea
								onChange={handleChange('description')}
								name="photo"
								className="form-control"
								placeholder="Description"
								value={description}
							/>
						</div>
						<button className="btn btn-outline-success" onClick={handleFireBaseUpload}>
							upload to website
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
