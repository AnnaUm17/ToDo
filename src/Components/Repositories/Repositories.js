import React from 'react';
import classnames from 'classnames';
import { Octokit } from '@octokit/rest';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Repositories.module.css';
import starImg from './img/Star.svg';
import strokeImg from './img/Stroke.svg';
import errorImg from './img/Error.svg';

const octokit = new Octokit();

class Repositories extends React.Component {
  state = {
    isLoading: true,
    isError: false,
    repoList: [],
    firstRepo: 0,
    lastRepo: 5
  }

  onClickBack = () => {
    this.setState({
      firstRepo: this.state.firstRepo - 5,
      lastRepo: this.state.lastRepo - 5,
    });
  };

  onClickNext = () => {
    this.setState({
      firstRepo: this.state.firstRepo + 5,
      lastRepo: this.state.lastRepo + 5,
    });
  };

  componentDidMount() {
    octokit.repos.listForUser({
      username: 'AnnaUm17'
      }).then(({ data }) => {
        this.setState({
          repoList: data,
          isLoading: false
        });
      }).catch(() => {
        this.setState({
          isLoading: false,
          isError: true,
        });
      });
  }

  render() {
    const { isLoading, isError, repoList, firstRepo, lastRepo } = this.state;

    return (
      <Card>
        <div className={styles.wrap}>
          <h1 className={styles.title}>Репозитории на github.com</h1>
          { isLoading ? <CircularProgress className={styles.preloader}/> :
            <div className={styles.inner}>
                { isError ?
                  <div className={styles.error_container}>
                    <img src={ errorImg } alt='Error' className={styles.error_img} />
                    <h2 className={styles.error_subtitle}>Что-то пошло совсем не так...</h2>
                    <p className={styles.error_text}>Попытка
                      <a href="#" onClick={() => window.location.reload()} className={styles.error_link}> загрузить </a>
                    еще раз</p>
                  </div> :
                    <div>
                      { repoList.length === 0 ?
                        <div className={styles.error_container}>
                          <img src={ errorImg } alt='Error' className={styles.error_img} />
                          <h2 className={styles.error_subtitle}>Репозитории отутствуют</h2>
                          <p className={styles.error_text}>Добавьте как минимум один репозиторий на&ensp;
                            <a href='https://github.com' target='_blank' rel='noopener noreferrer' className={styles.error_link}>github.com</a>
                          </p>
                        </div> :
                          <div>
                            {!isLoading && <ol className={styles.list}>
                              {repoList.slice(firstRepo, lastRepo).map(repo => (
                                <li key={repo.id} className={styles.list__item}>
                                  <a href={repo.html_url} target='_blank' rel='noopener noreferrer' className={styles.name}>{repo.name}</a>
                                  <div className={styles.info}>
                                    <div className={
                                      classnames({
                                        [styles.circle]: true,
                                        [styles.html]: repo.language === 'HTML',
                                        [styles.css]: repo.language === 'CSS',
                                        [styles.js]: repo.language === 'JavaScript'
                                      })}
                                    >
                                    </div>
                                    <p className={styles.language}>{repo.language}</p>
                                    <div className={styles.star}>
                                      <img src={ starImg } alt='Star' />
                                      <p>{repo.stargazers_count}</p>
                                    </div>
                                    <div className={styles.forks}>
                                      <img src={ strokeImg } alt='Stroke' />
                                      <p>{repo.forks}</p>
                                    </div>
                                      <p className={styles.update}>Updated on {new Date(repo.updated_at).toLocaleString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                      })}</p>
                                  </div>
                                </li>))}
                            </ol>}
                            <div className={styles.pagination}>
                              <button
                                className={classnames({
                                  [styles.button]: true,
                                  [styles.disabled]: firstRepo === 0
                                })}
                                onClick={() => this.onClickBack()}
                                disabled={firstRepo === 0}
                              >
                                Назад
                              </button>
                              <button
                                className={classnames({
                                    [styles.button]: true,
                                    [styles.disabled]: repoList.length <= lastRepo
                                })}
                                onClick={() => this.onClickNext()}
                                disabled={repoList.length <= lastRepo}
                              >
                                Далее
                              </button>
                            </div>
                          </div>
                      }
                    </div>
                }
            </div>
          }
        </div>
      </Card>
    );
  }
}

export default Repositories;
