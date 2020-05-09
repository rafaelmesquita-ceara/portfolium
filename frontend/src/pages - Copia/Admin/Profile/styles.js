import styled from 'styled-components';

export const Container = styled.table`
   padding: 7px;
   margin-top:50px;
   width:100%;
   background: #13121b;

   thead{
    
    text-align:left;
    tr{
      color: #10f8c2;

      th{

      padding-bottom: 10px;
      border-bottom: 1px solid #10f8c2;

        span{

          padding-left:4px;
        }
      }
    }
   }

   tr{
     padding-top:15px;
   }

   tbody{
    tr{
     text-align: left;
     color: #10f8c2;
     height: 35px;

    }
   }
`;
