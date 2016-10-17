import * as React from 'react';
import WordCreator from './WordCreator';
import Page from '../util/Page';
import BindingComponent from '../util/BindingComponent';
import {Lesson} from '../../reducers/lessonReducer';
import {
    TextField,
} from 'material-ui';

export interface LessonCreatorProps {
    children?: Element[];
    onChange?: (l: Lesson) => void;
    value?: Lesson;
    notFound: boolean;
}

export class LessonCreator extends BindingComponent<LessonCreatorProps> {
    constructor(props: LessonCreatorProps) {
        super(props);
        this.state = props.value || {
            'id': 0,
            'title': '',
            'word_infos': []
        };
    }

    get value(): Lesson {
        return {
            id: this.state['id'],
            title: this.state['title'],
            word_infos: this.state['word_infos'],
        };
    }

    componentDidUpdate() {
        if (this.props.onChange !== undefined) {
            this.props.onChange(this.value);
        }
    }

    render() {
        let content: any;
        if (this.props.notFound) {
            content = 'Lesson Not Found';
        } else {
            content = (
                <div>
                <TextField style={{fontWeight: 'bold', fontSize: '1.5em'}} hintText='Lesson Title' name='title'
                                value={this.state['title']}
                                onChange={this.bindValueToName.bind(this)}/>
                <h2>Words</h2>
                <WordCreator name='word_infos' value={this.state['word_infos']} onChange={this.updateState('word_infos', 'value')}/>
                </div>
            );
        }
        return  (
            <Page>
                {content}
            </Page>
        );
    }
}

export default LessonCreator;