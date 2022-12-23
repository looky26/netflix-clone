import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { selectSearch, setSearchBar } from "../features/searchSlice";
import {
  selectMovies,
  setMovies,
  
} from "../features/searchmovieSlice";

function Navbar({ setQueried }) {
  
  const searchIcon = useSelector(selectSearch);
  const dispatch = useDispatch();

  const [show, handleShow] = useState(false);
  const history = useHistory();

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => {
      window.removeEventListener("scroll", transitionNavbar);
    };
  }, []);

  const handleProfileView = () => {
    dispatch(setSearchBar(false));
    history.push("/profile");
  };

  //moviesearch

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const handelsearchSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    setQueried(true);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const API_KEY = "dae4955ad22831998335bbe9609e717b";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}}&page=1`;
    axios.get(url).then((res) => {
      //console.log(res.data.results);
      dispatch(setMovies(res.data.results));
    });
  }, [query]);

  console.log(query);

  return (
    <Container navblack={show}>
      <Wrap>
        <NavLogo>
          <img
            onClick={() => {
              dispatch(setSearchBar(true));
              history.push("/");
              setQueried(false);
            }}
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
        
          {searchIcon && (
            <form onSubmit={handelsearchSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={updateSearch}
              />
            </form>
          )}
        </NavLogo>
        <NavAvatar>
          <img
            onClick={handleProfileView}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEUNfoD///8Ae30AeHoAdXcAdnl6q6z2+/vo8vLx+Ph1sbIAdHfu9PQHfH8AgYPl8vI7kJKRvr+hx8jO4+PJ3d4eioxppqja6eni7OxdoqRSnqC42dqXxsaw09Ntra8ph4l/uLmGtrdapqeozc02lZdMmZuuzM3A2NnU4+SRvL2fy8xSmZpEkZO+1NV1qaqNxlfBAAAEIElEQVR4nO3bXXeiOhQGYNgJg6AiiIiggtbP0U7//8+beJzjoCYtSAQ7630uetVmvZuEEOnWMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvjNi3Ii8rkWtpuiLGCyKxA/dOchIZ3FPmGc5tVckGf4iPMUIA9/QGYNoEZr/c4Y+0zh2FSydX2KY00RfDDJ2ZlEnbadEa+EUYziBrlkkPzav2W4rJc5vYphzTQPTbYGixBZmkc/uYphDPTG29yObHb/p7YYSSQxzqSEGJbZs6FX9kavJQ1mMQV6/RDaVjWzaDU8i/ZDGMBf116knH1nH0FUoLrQ5qR2D3hQVhl0dwUvjihh2VHctsZVqaC3By6K1IoaZ1a2Qj5QXr68leznKpWQu6y5Tfv8wbKXC7HkV7hQjN1xh+rQKmeQkca6w0acFRaoKa9+HyosXci3Ry7Kk5w4de6lhKCps+nl4d+w+q/88VD0uHA3HpSpoLJ/ErH6FdHRkIw+b3GdOPOljK841DE2yvWaiYflXjLGWTKLtaolB9w8Me938uxq+uC8x0LMZUHRboqNh9T+QY3lb4ErXrUL92dXli6N23tPwt04xRsfV+MCi5O+Hl8Gy4W20EMMvXOrhRut1Jsrd+WQy2c82Wt9TVo7hpatY5FhlhvbXtsQsLmh/11w9x0vEAAAAAAAAAAAAAAAAgH8KMc/4l/8HRXyz3e2GLf07uqD/nO+fkLHZ2eeWgnZnkVi0ifSvJOLJpUXKTtoskfxdp9fZb7TWSETprtA50XCD3RWW/Qky19dUQCx3b7r2PV1jV+dd+sU6M88iDc0v1I2Cu5bextuzLqyrdrGgdhOHmL6xrGM/0hP3EfurIM42YY/fkMRYOpR2ZDvt3Yfe/iaLPVn4j7TBiL0l9xexooe24UbXIkvWL7n7uSGryh1JjEfjofQrQefV/7T8X2OuNFIvnq3FmisxlyR+zYoWo4Fi9oRB1kAhapbyytvT4OM9OpUpr1PUZhnR8SOYqosT4sxq99AmHvifxBuEo2G2iXiXc1bEeddYp8vtaN/55K9P9bntH0qJZV+kFHrh9HAI3P8sDodVqL7nCuzwrc0Wwr9YFEjbxGuy5+MWv1F+jcgPPr2XHtAL3l9j/v4Qny+CUguvHGfnvt7n3r44LSu+IFnVIDgarW8vUsSjmepQUnr24iB65dZZYt54NXi8vtEw9V64vDOx/fmHuPre6vSmWa6/r/s5xDls7W7D8lU64fZn6vFvUt4ZMcrfk2D69VnAmQbj95xefm3KiHMn73prN/g1CuO441zm1HacQRyHo19Btva6vMz5/JWd6jQ83z8mx48fZ8kx2fi5R9++tiKiPl1rOxEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALy43/ipMgzSotaqAAAAAElFTkSuQmCC"
            alt=""
          />
        </NavAvatar>
      </Wrap>
    </Container>
  );
}

export default Navbar;

const Container = styled.nav`
  position: fixed;
  top: 0;
  padding: 20px;
  width: 100%;
  height: 30px;
  z-index: 1;

  /* animation */
  transition-timing-function: ease-in;
  transition: all 0.5s;

  /* conditional  */
  ${(props) =>
    props.navblack &&
    css`
      background-color: black;
    `}
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavLogo = styled.div`
  img {
    position: fixed;
    top: 10px;
    left: 0;
    width: 80px;
    object-fit: contain;
    padding-left: 20px;
    cursor: pointer;
  }

  form {
    margin-left: 100px;

    input {
      outline: none;
      background: #ededed
        url(https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png)
        no-repeat 9px center;
      border: solid 1px #ccc;
      padding: 9px 10px 9px 32px;
      width: 55px;

      -webkit-border-radius: 10em;
      -moz-border-radius: 10em;
      border-radius: 10em;

      -webkit-transition: all 0.5s;
      -moz-transition: all 0.5s;
      transition: all 0.5s;

      width: 15px;
      padding-left: 10px;
      color: transparent;
      cursor: pointer;

      &:hover {
        background-color: #fff;
      }

      &:focus {
        width: 130px;
        padding-left: 32px;
        color: #000;
        background-color: #fff;
        cursor: auto;
      }
      &::-moz-placeholder {
        color: transparent;
      }

      &::-webkit-input-placeholder {
        color: transparent;
      }
    }
  }
`;

const NavAvatar = styled.div`
  img {
    position: fixed;
    right: 20px;
    width: 30px;
    cursor: pointer;
  }
`;
