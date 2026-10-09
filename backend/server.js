import express from 'express';
import cors from 'cors';
const app=express(); app.use(cors()); app.use(express.json());
const branches=['Coimbatore','Chennai','Salem'];
const books=[
{id:'B101',title:'Atomic Habits',author:'James Clear',category:'Self Development',isbn:'9780735211292',copies:{Coimbatore:4,Chennai:2,Salem:1}},
{id:'B102',title:'Clean Code',author:'Robert C. Martin',category:'Technology',isbn:'9780132350884',copies:{Coimbatore:2,Chennai:0,Salem:1}},
{id:'B103',title:'The Alchemist',author:'Paulo Coelho',category:'Fiction',isbn:'9780061122415',copies:{Coimbatore:3,Chennai:2,Salem:2}},
{id:'B104',title:'Deep Learning',author:'Ian Goodfellow',category:'Technology',isbn:'9780262035613',copies:{Coimbatore:0,Chennai:2,Salem:1}},
{id:'B105',title:'Wings of Fire',author:'A. P. J. Abdul Kalam',category:'Biography',isbn:'9788173711466',copies:{Coimbatore:2,Chennai:1,Salem:0}},
{id:'B106',title:'The Pragmatic Programmer',author:'Andrew Hunt',category:'Technology',isbn:'9780201616224',copies:{Coimbatore:1,Chennai:1,Salem:1}}
];
const loans=[];
const ok=(res,data,status=200)=>res.status(status).json({success:true,data});
const err=(res,status,message)=>res.status(status).json({success:false,error:{status,message}});
app.get('/api/health',(req,res)=>ok(res,{status:'running',service:'OpenShelf Library API'}));
app.get('/api/books',(req,res)=>{const q=(req.query.q||'').toLowerCase();const data=books.filter(b=>(b.title+' '+b.author+' '+b.isbn+' '+b.category).toLowerCase().includes(q));ok(res,data)});
app.get('/api/books/:id',(req,res)=>{const b=books.find(x=>x.id===req.params.id);return b?ok(res,b):err(res,404,'Book not found')});
app.get('/api/books/:id/availability',(req,res)=>{const b=books.find(x=>x.id===req.params.id);if(!b)return err(res,404,'Book not found');ok(res,{bookId:b.id,branches:Object.entries(b.copies).map(([branch,availableCopies])=>({branch,availableCopies}))})});
app.get('/api/branches',(req,res)=>ok(res,branches.map(name=>({name}))));
app.post('/api/borrowings',(req,res)=>{const {userId,bookId,branch}=req.body||{};if(!userId||!bookId||!branch)return err(res,400,'userId, bookId and branch are required');const b=books.find(x=>x.id===bookId);if(!b)return err(res,404,'Book not found');if(!branches.includes(branch))return err(res,400,'Unknown branch');if((b.copies[branch]||0)<1)return err(res,409,'No copies available at this branch');if(loans.some(l=>l.userId===userId&&l.bookId===bookId&&l.status==='Borrowed'))return err(res,409,'User already has this title on loan');b.copies[branch]--;const today=new Date();const due=new Date(today);due.setDate(due.getDate()+14);const loan={id:'LN'+Date.now(),userId,bookId,branch,borrowedAt:today.toISOString().slice(0,10),dueDate:due.toISOString().slice(0,10),status:'Borrowed'};loans.push(loan);ok(res,loan,201)});
app.get('/api/users/:userId/borrowings',(req,res)=>ok(res,loans.filter(l=>l.userId===req.params.userId)));
app.post('/api/returns',(req,res)=>{const {loanId}=req.body||{};if(!loanId)return err(res,400,'loanId is required');const l=loans.find(x=>x.id===loanId);if(!l)return err(res,404,'Borrowing record not found');if(l.status==='Returned')return err(res,409,'This book has already been returned');l.status='Returned';l.returnedAt=new Date().toISOString().slice(0,10);const b=books.find(x=>x.id===l.bookId);if(b)b.copies[l.branch]=(b.copies[l.branch]||0)+1;ok(res,l)});
app.use((req,res)=>err(res,404,'Endpoint not found'));
app.use((e,req,res,next)=>{console.error(e);err(res,500,'Unexpected server error')});
const port=process.env.PORT||5000;app.listen(port,()=>console.log(`OpenShelf API running at http://localhost:${port}`));
