import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
	region: 'us-east-2',
	accessKeyId: 'AKIA4KI6HSV4O4EDEZP5',
	secretAccessKey: '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'
});

const dynamoDB = new AWS.DynamoDB();

const ReadDataButton = () => {
	const [data, setData] = useState([]);

	const handleButtonClick = async () => {
		const params = {
			TableName: 'ImageMetadata.1',
		};
		

		const result = await dynamoDB.scan(params).promise();
		console.log(result);
		console.log("2");
		console.log(result.Items);
		

		const items = result.Items.map(item => ({
			imageid: item.imageid.S,
			label: item.detectedlabel.S,
			text: item.detectedtext.S,
			url: item.imageurl.S
			
		}));
				console.log("3");


		console.log(items);

		setData(items);
	};

	return (
		<div>
			<button onClick={handleButtonClick}>Read Data</button>
      		{data.map((item, index) => (
        		<div key={index}>
          			<p>ID: {item.imageid}</p>
          			<p>Label: {item.label}</p>
          			<p>Text: {item.text}</p>
          			<p>URL: {item.url}</p>

        		</div>
      		))}
    	</div>
	);
};

export default ReadDataButton;