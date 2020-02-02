&nbsp;&nbsp;&nbsp;&nbsp;MedsimplifAI
=================================================
An AI-powered application to close the gap on health illiteracy

what is the name
-----------------
Client
------

server
------
We built a nodejs server that uses Microsoft’s Azure cognitive services to provide a REST API to the client. The API supports endpoints for uploading and retrieving a prescription images and retrieving text content of the image. When a request is made to the server with a prescription image, our API acts as a middleware and uses the image to make a call to the Azures’s Optical Character Recognition API. The returned text is then parsed and cleaned. We use MongoDB for our database to store the texts.

The returned text is sent to a medical jargon dictionary which returns the description of the jargon

We use  Azure Computer Vision for image and text recognition. 

We are hoping to integrate it with Azure’s Cosmos DB in future iterations of the application to personalize patient's experience. Using the parsed and cleaned text, we are hoping to use the Named Entity Recognition feature of  Azure Text Analytics API to detect dates and times and be able to upload these into the application’s personalized calendar that reminds patients when prescriptions are due.

