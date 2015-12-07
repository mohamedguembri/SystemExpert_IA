

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function ctr1(quoi)	//~~ interdire réponse vide ~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{	if (document.getElementById(quoi).value.length>0) 
		{	NvQst();	}	}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function ctr2(quoi)	//~~ interdire réponse vide ~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{	if (document.getElementById(quoi).value.length>0) 
		{	Nouv();	}	}
function CtrCar(zone)	//~~ oter les caractères génants ~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{	return zone.replace(/[\'\"?]/g,"");	}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function finoupas()	//~~ arret ou pas ? ~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{	if ( confirm("voulez vous recommencer la partie?") ) 
		{	window.location.reload();	}
	else	{	opener=self;
			window.close();	}	}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function NvQstON(quoi)	//~~ ajout nouveau plat~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{


	var mem=plats[avant][SiON];
	plats[avant][SiON]=plats.length;
	var a=plats.length;
	plats.length++;
	plats[a]=new Array();
	plats[a][0]=document.getElementById("NvQues"+actuel).value;
	if ( quoi==1 )
		{	plats[a][1]=document.getElementById("Nouv"+actuel).value;
			plats[a][2]=mem;	}
	else	{	plats[a][2]=document.getElementById("Nouv"+actuel).value;
			plats[a][1]=mem;	}
	var ts=fso.OpenTextFile(prm,2,true);	////////////////////////
	var m,b;				// Sauver les plats//
	for ( var a=0;a<plats.length;a++ )	////////////////////////
	{	m="";
		for ( b=0;b<plats[a].length;b++)
		{	m+=plats[a][b]+"\t";	}
		m=m.substring(0,m.length-1);
		ts.WriteLine(m);	}
	ts.close();
	finoupas();	}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function NvQst()	//~~ caractéristiques nouvel animal ~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{	document.frm.innerHTML+="<br/>Et la réponse à '"+
		document.getElementById("NvQues"+actuel).value+
		"' ? pour '"+
		document.getElementById("Nouv"+actuel).value+
		"'&nbsp;serait&nbsp;"+
		"<button onclick='NvQstON(1);'>Oui</button> ou&nbsp;"+
		"<button onclick='NvQstON(2);'>Non</button>";	}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Nouv()	//~~ nouvel animal ~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{	document.frm.innerHTML+="<br/>Et quelle question permettrait de le différencier du '"+
		plats[actuel][SiON]+"' ? "+
		"<br/>&nbsp;<input	onkeyup='this.value=CtrCar(this.value);' type='text' id='NvQues"+actuel+"' size=64 />"+
		"&nbsp;<button onclick='ctr1(\"NvQues"+actuel+"\");'>Valider</button>";	}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Aff(YN)	//~~ proposer une solution ~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{	var q;
	if ( actuel>0 )
		{	q=	"alors c'est "+
				plats[actuel][SiON]+" "+
				document.getElementById("Btn"+YN+"_"+actuel).innerHTML; }
	else	{     	q=plats[actuel][YN];	}
	document.getElementById("Affirme"+actuel).innerHTML=q;
	if ( YN==1 )
		{	if ( actuel==0 ) 	
				d="";
			else	d="Je suis pro à la cuisine tunisienne, n'est-ce pas !";
			document.frm.innerHTML+=d;
			finoupas();
			return;	}
	document.frm.innerHTML+="Désolé, je ne connais pas ce plat :/"+
				"<br/>C'est quoi alors ? "+
				"&nbsp;<input	onkeyup='this.value=CtrCar(this.value);' type='text' id='Nouv"+actuel+"' size=64 />"+
				"&nbsp;<button  onclick='ctr2(\"Nouv"+actuel+"\");'>Valider</button>";	}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Rep(YN)	//~~ réponse à une question "normale" ~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{	avant=actuel;
	SiON=YN;
	document.getElementById("Quest"+actuel).innerHTML=
		plats[actuel][0]+" ? "+
		document.getElementById("Btn"+YN+"_"+actuel).innerHTML;
	var s;
	if ( actuel>0) 	s=plats[actuel][YN];
	else		s=1;
	if ( !isNaN(s) )
		{	if ( actuel==0 && YN==2 )
				{	document.frm.innerHTML+="Au revoir :)";	}
			else	{	actuel=parseInt(s,10);
					Affiche();	}
		return;	}
	else	{	if ( actuel>0 ) d="alors c'est ";
			else		d="";
			var q=	"<div name='Affirme' id='Affirme"+actuel+"'>"+
				d+
				plats[actuel][YN]+
				"&nbsp;?&nbsp;<button id='Btn1_"+actuel+"' onclick='Aff(1);'>Oui</button>&nbsp;"+
				"<button id='Btn2_"+actuel+"' onclick='Aff(2);'>Non</button>"+
				"</div>";	
			document.frm.innerHTML+=q;	}	}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Affiche()	//~~ affiche la question ~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{	var q=	"<div name='Quest' id='Quest"+actuel+"'>"+
		plats[actuel][0]+
		" ? <button id='Btn1_"+actuel+"' onclick='Rep(1);'>Oui</button>&nbsp;"+
		      "<button id='Btn2_"+actuel+"' onclick='Rep(2);'>Non</button>"+
		"</div>";
	document.frm.innerHTML+=q;	}
