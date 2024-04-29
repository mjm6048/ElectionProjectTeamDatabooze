import axios from "axios";
const responseTimes = []; 
const getAverageResponseTime = () => {
 

  const measuredAxios = async (config) => {
    const start = performance.now();
    try {
      const response = await axios(config);
      const end = performance.now();
      const duration = end - start;
      responseTimes.push(duration);
      return response;
    } catch (error) {
      const end = performance.now();
      const duration = end - start;
      responseTimes.push(duration);
      throw error;
    }
  };

  const getAverage = () => {
    if (responseTimes.length === 0) {
      return 0;
    }
    const sum = responseTimes.reduce((acc, time) => acc + time, 0);
    return sum / responseTimes.length;
  };

  return { measuredAxios, getAverage };
};

export default getAverageResponseTime;
