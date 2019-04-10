import styled from 'styled-components'

const s = {}

s.Wrapper = styled.div`
max-width: 800px;
margin: 100px auto; 
border: 2px solid #fff2c9; 
border-radius: 10px; 
box-shadow:-5px 3px 20px grey;  
padding: 0;
background-color: white;
display:flex;

`
s.btn = styled.button`
border: 1px solid transparent;
color:white;
font-size: 1.2em;
font-weight: 500; 
padding: 5px 10px; 
border-radius: 5px;
font-family: inherit;
display: block;
min-width: 100px;
transition: box-shadow .2s, transform .2s, background-color .2s;
margin-bottom: 10px;
text-decoration: none;
cursor: pointer;

:hover, active {
	box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .2);
	transform: scale(1.01, 1.01);
}
`

s.NavArea = styled.nav`
margin: -2px;
background-color:  #248f24;
border-radius: 10px 0 0 10px;

`
s.NavLinks = styled.div`
padding: 20px;
min-width: 100px;
text-align: center;
font-size: 1.2em;
color:white;
cursor: pointer;

`

s.Content = styled.div`
margin-left: 10px;
border-radius: 20px;
padding: 20px 20px;
flex-grow: 3;
min-height: 350px;

`
s.LoginForm = styled.form`
max-width:300px;
margin: 0 auto;
display: flex;
flex-direction: column;
`
s.LoginInput = styled.input`
font-size: 1.4em;
padding: 5px;
margin-top: 20px; 
border-bottom: 3px solid black;
border-top: none;
border-right: none;
border-left: none;
outline: none;

:focus { 
background-color: #e6e6e6;
border-top: none;
}

`
s.AuthNotice = styled.div`
border:2px solid #cc0000;
text-align: center;
color: #cc0000;
background-color:  #ffeee6;
border-radius:3px;
padding:10px;

`
s.H1 = styled.h1`
text-align: center;
padding: 5px;
`
s.LoginButton = styled(s.btn)`
background-color:#8f2424;
padding: 10px;
margin-top:20px;
font-size: 1.4em;
:hover, active {
	background-color: #cc3333;
}
`
s.P = styled.p`{
text-align: center;
}`
s.A = styled.a`{
text-decoration: underline;
color:blue !important; 
}`

s.SearchInput = styled(s.LoginInput)`
font-size: 1.2em;
width: 100%;
margin-top: -10px;

`
s.SearchArea = styled.div`
display:flex;
`
s.EmptyBtn = styled.button`
margin: 0; padding:0; outline:none; background-color:transparent; border: none
`
s.List = styled.div`
display: flex;
flex-direction: column;
border-radius: 10px 10px 3px 3px;
margin-top: 20px
box-shadow:-2px 1px 10px grey;  
`
s.ListTitle = styled.div`
display: flex;
justify-content: space-between;
background-color: #8f3f24;
flex-direction: column;
padding:10px;
border-radius: 10px 10px 0 0 ;
margin-top:-2px;
color:white;

`
s.ListTitleDiv = styled.div`
display: flex; 
justify-content: space-between; 
align-items: baseline;

`

s.Description = styled.article`
text-align: left;
border: 1px solid #8f3f24;
border-top: none;
border-radius:0 0 3px 3px ;
padding: 10px;
`
s.H3 = styled.h3`
font-size: 1.2em;
font-weight: 500;
margin:0;
padding-top: 10px;
`

s.AA = styled.a`{
text-decoration: underline;
color:white !important; 
}`

s.PostCommentArea = styled.form`
display: flex;
flex-direction: column;

`
s.Textarea = styled.textarea`
font-family: inherit;
font-size: 1.2em;
padding: 10px;
margin: 20px 0 -10px 0;
border: 2px solid black;
border-radius: 5px;
background-color: #d6f5d6;

`
s.ListComment = styled(s.List)`
width: 80%;

:nth-child(odd) {
align-self: flex-end;
}
`
s.CommentsWrapper= styled.div`
display: flex;
flex-direction: column
`
s.CreatPostForm = styled(s.LoginForm)`
max-width: 600px;
`
s.EditBar = styled.a`
display: inline-block;
background-color:  #d16a47;
padding: 5px 10px;
margin-right: 10px; 
border: 1px transparent solid
border-radius: 5px;
cursor: pointer;
`

export default s