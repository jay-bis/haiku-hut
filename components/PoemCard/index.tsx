import React from 'react';
import { View } from 'react-native';
import { Button, Card, Layout, Text, Divider, List } from '@ui-kitten/components';


export interface Props {
    title: string,
    content: string,
    createdAt: string,
    author: string,
    cardStyle: List<Object>,
    layoutStyle: Object
    // isHaiku: boolean
}

export interface PropsHeader {
    title: string,
    author: string
}

const Header: React.FC<PropsHeader> = ({title, author}) => (
    <View>
        <Text style={{  fontFamily: 'Acre-Medium' }} category='h6'>{title}</Text>
        <Text style={{  fontFamily: 'Acre-Medium' }} category='h6'>By: {author}</Text>
    </View>
)

const PoemCard: React.FC<Props> = ({ title, content, createdAt, author, cardStyle, layoutStyle }) => (
    <Layout
        style={layoutStyle}
    >
        <Card //niuj
            style={cardStyle}
            header={(props) => <Header {...props} title={title} author={author} />}>
            <Text style={{  fontFamily: 'Acre-Medium' }}>{content}</Text>
            <Divider style={{ height: '10%', backgroundColor: 'transparent' }}/>
            <Text>{Date.parse(createdAt)}</Text>
        </Card>
    </Layout>
)

export default PoemCard;