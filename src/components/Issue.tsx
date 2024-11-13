import React from 'react'
import { IssueType } from '../types/Issue.types'

interface Props {
    issue: IssueType;
    index: number;
    selected: boolean;
    toggle: (index: number) => void;
}

const Issue: React.FC<Props> = ({ issue, index, selected, toggle }) => {
    return (
        <div className="issue">
            <div className="header">
                <button onClick={() => toggle(index)}>
                    {selected ? 'Collapse' : 'Expand'}
                </button>
                <span>
                    {issue.number}. {issue.title}
                </span>
            </div>
            <div className={selected ? 'body show' : 'body'}>
                {issue.body}
            </div>
        </div>   
    );
};

export default Issue