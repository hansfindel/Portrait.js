function hereDoc(f) {
	//console.log("here doc...")
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
};

function makeTemplate(f){ return hereDoc(f); }

function getTemplate(){
	var s = $(this).text().split("EOF")[1] || "";
	return s;
}