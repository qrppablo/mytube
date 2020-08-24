import React from 'react';
import SearchBar from './SearchBar'
import youtube from '../apis/youtube'
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import { IoIosPlayCircle } from 'react-icons/io';

const KEY = "AIzaSyAZ2Re7hZ5BDSh553ckOyAu2-2JOQn0VpQ";

class App extends React.Component {

    state = { videos: [], selectedVideo: null };

    componentDidMount() {
        this.onTermSubmit('javascript');
    }

    onTermSubmit = async term => {
        const response = await youtube.get("/search", {
        params: {
            q: term,
            part: "snippet",
            type: "video",
            maxResults: 5,
            key: `${KEY}`
            }
        });

        this.setState({ 
            videos: response.data.items,
            selectedVideo: response.data.items[0] 
        });

    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    };

    render() {
        return (
            <div className="wrapper">
                <div className="ui container">
                    <div className="header">
                        <div className="header__text">
                            <p>MyTube</p>
                        </div>
                        <IoIosPlayCircle className="header__icon" />
                        <SearchBar onFormSubmit={this.onTermSubmit} />
                    </div>
                    <div className="ui grid">
                        <div className="ui row">
                            <div className="eleven wide column">
                                <VideoDetail video={this.state.selectedVideo} />
                            </div>
                            <div className="five wide column">
                                <VideoList 
                                    onVideoSelect={this.onVideoSelect} 
                                    videos={this.state.videos} 
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="footer">
                        <p>&copy; Pablo Torres</p>
                    </div>

            </div>
        );
    }
}

export default App;