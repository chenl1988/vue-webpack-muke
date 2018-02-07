/* 在jsx中无法直接写样式，需要单独写在样式文件中 */
import "../assets/styles/footer.styl"

export default{
    data(){
        return{
            author:"chenl"
        }
    },
    render(){
        return(
            <div id="footer">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}