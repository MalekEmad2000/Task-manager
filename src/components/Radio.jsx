import React from "react";




function Radio(props){

   

return (

<div className="card">
	<h2>this task is for </h2>
	
	<ul>
		<li>
			<input  type="radio" name="name" id="one" value="me" />
			<label name="true" htmlFor="one"> ME </label>
			
			<div className="check"></div>
		</li>
		
		<li>
			<input  type="radio" name="name" id="two" value="not-me" />
			<label name="false"    htmlFor="two">To another user </label>
			
			<div className="check"></div>
		</li>
	</ul>
</div>

)

 




}


export default Radio