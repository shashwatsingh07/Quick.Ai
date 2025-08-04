// import { FileText, Sparkles } from 'lucide-react';
// import React, { useState } from 'react'
// import axios from 'axios';
// import {useAuth} from '@clerk/clerk-react'
// import Markdown from 'react-markdown';


// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const ReviewResume = () => {
 
//     const [input ,setInput]=useState('');
//     const [loading , setLoading]=useState(false);
//     const [content, setContent] = useState('')

//   const {getToken} = useAuth();
  
//     const onSubmitHandler=async(e)=>{
//       e.preventDefault();
//        try{
//            setLoading(true)

//       const formData= new FormData()
//       formData.append('resume', input);
     


//       const {data}= await axios.post('/api/ai/resume-review', formData , {
//         headers : {Authorization :`Bearer ${await getToken()}`}
//       });

//       if(data.success){
//         setContent(data.content)
//       }else{
//         toast.error(data.message)
//       }
//       }catch(error){
//         toast.error(error.message)
//       }
//       setLoading(false);
      
//     }


//   return (
//     <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
//       <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
//         <div>
//           <Sparkles className='w-6 text-[#00DA83]'/>
//           <h1 className='text-xl font-semibold'>Resume Review</h1>
//         </div>
//         <p className='mt-6 text-sm font-medium'>Upload Resume </p>
//         <input onChange={(e)=>setInput(e.target.files[0])} type="file" accept='application/pdf*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' placeholder='The future of artificial intelligence is...' required/>
        
//         <p className='text-xs text-gray-500 font-light mt-1'>Supprt PDF resume only.</p>
        
//         <button disabled={ loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
//           {
//             loading ? 
//             <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
//             :<FileText className='w-5'/>
//           }
//           Review Resume
//         </button>
//       </form>

//       {/*Rigth col*/}
//       <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-100 max-h-[600px]'>
//         <div className='flex items-center gap-3'>
//           <FileText className='w-5 h-5 text-[#00DA83]'/>
//           <h1 className='text-xl font-semibold'> Analysis Results </h1>
//         </div>
//        {
//         !content ? (
//            <div className='flex-1 flex justify-center items-center'>
//           <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
//             <FileText className='w-9 h-9' />
//             <p>Upload a resume and click "Review Resume" to get started</p>
//           </div>

//         </div>
//         ) : (
//           <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'> 
//           <div className='reset-tw'>
//             <Markdown>{content}</Markdown>
//           </div>
//           </div>
//         )
//        }
//       </div>
//       <div>

//       </div>

//     </div>
//   )
// }

// export default ReviewResume

import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import Markdown from 'react-markdown';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [atsScore, setAtsScore] = useState(null);

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('resume', input);

      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setContent(data.content);
        setAtsScore(data.atsScore); // extract atsScore
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* Left panel */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'
      >
        <div>
          <Sparkles className='w-6 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Resume</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          type='file'
          accept='application/pdf'
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600'
          required
        />
        <p className='text-xs text-gray-500 font-light mt-1'>
          Supported format: PDF only (Max 5MB).
        </p>

        <button
          disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'
        >
          {loading ? (
            <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
          ) : (
            <FileText className='w-5' />
          )}
          Review Resume
        </button>
      </form>

      {/* Right panel */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-100 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <FileText className='w-5 h-5 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'>Analysis Results</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <FileText className='w-9 h-9' />
              <p>Upload a resume and click "Review Resume" to get started</p>
            </div>
          </div>
        ) : (
          <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600 space-y-4'>
            {atsScore !== null && (
              <div className='bg-gray-100 rounded-md p-3 border border-green-200 shadow-sm'>
                <p className='text-sm font-semibold text-gray-700'>
                  ATS Score:
                  <span
                    className={`ml-3 font-bold ${
                      atsScore >= 70
                        ? 'text-green-600'
                        : atsScore >= 50
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {atsScore}/100
                  </span>
                </p>
              </div>
            )}
            <div className='reset-tw'>
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
