import React from 'react'
import ReactDOM from 'react-dom'
import BraftEditor from '../src'
import ColorPicker from 'braft-extensions/dist/color-picker'
import Emoticon, { defaultEmoticons } from 'braft-extensions/dist/emoticon'

import JSONTree from 'react-json-tree'
import {convertToRaw} from  'draft-js'

import 'braft-extensions/dist/emoticon.css'
import 'braft-extensions/dist/color-picker.css'

const emoticons = defaultEmoticons.map(item => require(`braft-extensions/dist/assets/${item}`))

BraftEditor.use([
  Emoticon({
    emoticons: emoticons
  }),
  ColorPicker({
    theme: 'dark'
  })
])

class Demo extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      count: 0,
      readOnly: false,
      editorState: BraftEditor.createEditorState(null)
    }

  }

  handleChange = (editorState) => {
    this.setState({ editorState })
  }

  logHTML = () => {
    console.log(this.state.editorState.toHTML())
  }

  render() {

    const { readOnly, editorState } = this.state
    const theme = {
      scheme: 'monokai',
      author: 'wimer hazenberg (http://www.monokai.nl)',
      base00: '#000000',
      base01: '#383830',
      base02: '#49483e',
      base03: '#75715e',
      base04: '#a59f85',
      base05: '#f8f8f2',
      base06: '#f5f4f1',
      base07: '#f9f8f5',
      base08: '#f92672',
      base09: '#fd971f',
      base0A: '#f4bf75',
      base0B: '#a6e22e',
      base0C: '#a1efe4',
      base0D: '#66d9ef',
      base0E: '#ae81ff',
      base0F: '#cc6633',
    };

    let blockMap = editorState.getCurrentContent().getBlockMap();
    blockMap.forEach((v,k,c)=>{
      console.log('block');
      console.log(v)
    });
    const raw = convertToRaw(editorState.getCurrentContent())
    return (
      <div>
        <div className="demo" id="demo">
          <BraftEditor
            extendControls={[{
              key: 'log-html',
              type: 'button',
              text: 'Log HTML',
              onClick: this.logHTML,
            }, {
              key: 'my-modal',
              type: 'modal',
              text: 'modal',
              modal: {
                id: 'a',
                closeOnBlur: true,
                confirmable: true,
                closeOnConfirm: false,
                component: <div>123123</div>
              }
            }]}
            triggerChangeOnMount={false}
            value={editorState}
            onChange={this.handleChange}
            readOnly={readOnly}
          />
        </div>
        <JSONTree
          shouldExpandNode={false}
          theme={theme}
          data={editorState.getCurrentContent()}
        />
        {/*<JSONTree*/}
          {/*shouldExpandNode={false}*/}
          {/*theme={theme}*/}
          {/*data={raw}*/}
        {/*/>*/}
      </div>
    )

  }

}

ReactDOM.render(<Demo />, document.querySelector('#root'))
