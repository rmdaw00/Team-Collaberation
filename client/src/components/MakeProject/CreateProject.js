import React from 'react';
import {Button} from 'reactstrap';
import * as AiIcons from "react-icons/ai";


function CreateProject () {

  return (
  
    <div className="main_note">

        <form>
            <input type="text" placeholder="Title" />
            <textarea rows=" "  column=" " placeholder="Create new project.."></textarea>
            { <Button>
                {/* <AddIcon className="plus_sign" /> */}
                <AiIcons.AiOutlinePlus/>
            </Button> }
        </form>
    </div>
  
  );
};

export default CreateProject