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
		<table>
			<button onClick={handleButtonClick}>Read Data</button>
			<thead>
        		<tr>
          			<th>ID</th>
          			<th>Labels</th>
          			<th>Text</th>
        		</tr>
      		</thead>
			<tbody>
				{data.map((item, index) => (
					<tr key={index}>
						<td>{item.imageid}</td>
						<td>{item.label}</td>
						<td>{item.text}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ReadDataButton;