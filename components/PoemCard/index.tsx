import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Layout, Text, Divider, List, useTheme } from '@ui-kitten/components';


export interface Props {
    title: string,
    content: string,
    createdAt: string,
    author: string,
    cardStyle: List<Object>,
    layoutStyle: Object
    isHaiku: boolean
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

const PoemCard: React.FC<Props> = ({ title, content, createdAt, author, cardStyle, layoutStyle, isHaiku }) => {

    const theme = useTheme();

    return (
        <Layout
            style={layoutStyle}
        >
            <Text style={[{ borderColor: theme['color-primary-transparent-500'] }, styles.poemTypeTip]}>
                {
                    isHaiku
                    ? 'Haiku'
                    : 'Free Form'
            
                }
            </Text>
            <Card
                style={cardStyle}
                header={(props) => <Header {...props} title={title} author={author} />}>
                {content.split('\n').map((line) => (
                    <Text style={styles.line} key={line}>{line}</Text>
                ))}
                <Divider style={styles.divider}/>
                <Text>{Date.parse(createdAt)}</Text>
            </Card>
        </Layout>
    )
}

const styles = StyleSheet.create({
    poemTypeTip: {
        padding: 0,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderStyle: 'solid',
        borderWidth: 1,
        fontFamily: 'Acre-Medium',
        height: 24,
        textAlign: 'center',
        top: 12,
        borderRadius: 6,
        overflow: 'hidden',
        zIndex: 9000,
        paddingLeft: 5,
        paddingRight: 5
    },
    divider: {
        height: '10%',
        backgroundColor: 'transparent'
    },
    line: {
        fontFamily: 'Acre-Medium',
        marginBottom: 5
    }
})

export default PoemCard;